const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
require("dotenv").config();
const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const port = 5000;
const sessionId = uuid.v4();

const socketServer = require("./socketServer");
const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const memoryGameRoutes = require("./routes/memoryGameRoutes");
const animatedRoutes = require("./routes/animatedRoutes");
const fetch=require('node-fetch-commonjs')
// require("dotenv").config({ path: "" });
const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.set("view engine", "html");
app.use(express.static("public"));

// register the routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/memoryGame", memoryGameRoutes);
app.use("/api/2048animated", animatedRoutes);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Accept request from every domain and respond
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.post("/send-msg", (req, res) => {
  runSample(req.body.MSG).then((data) => {
    res.send({ Reply: data.reply ,Intent: data.intent,uri:data.uri});
  });
});

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg, projectId = "database-c051f") {
  // A unique identifier for the given session

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename:
      "C:/Users/lokes/Desktop/play/PlayTopia/backend/database-c051f-5b8ec5e81639.json",
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log("  No intent matched.");
  }
  
  //if the intent is to suggest song or search song then we make api call to generate the result
  if(result.intent.displayName=="suggest song's"){
    const uri= await generateURIS(result.parameters.fields.genre?.stringValue+result.parameters.fields.musicartist?.stringValue); //generate endpoint
    return {reply:result.fulfillmentText,intent:result.intent.displayName,uri:uri}
 }
 if(result.intent.displayName=="search songs"){
   const uri=await generateURIS(result.queryText); //generate endpoint
   return {reply:result.fulfillmentText,intent:result.intent.displayName,uri:uri}
 }
  return {reply:result.fulfillmentText,intent:result.intent,uri:[]};
}


async function generateURIS(query){
  try{
    if(query==""){
      query="trending" //this give's what will be shown if bot fail's to display anything
    }
   
    const params1={ //credential's for spotify api for generating token
      client_secret:'906dd71f26fd49a89f98e8e6beff0ed3',
      client_id:'0e4f1a2f3ddc4b61a52631b1db690ee7',
      grant_type:'client_credentials',
    }
    const url1 = new URL('https://accounts.spotify.com/api/token'); //token generation 
    url1.search = new URLSearchParams(params1).toString();

    const options1={
      method: 'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'}
    }
    const res1=await fetch(url1,options1)
    const data1=await res1.json();
    
    const url2=new URL('https://api.spotify.com/v1/search'); //actual query to the api to get the uri
    const params2={
      q:query,
      type:'track',
      offset:'0',
      limit:'3', //change this to adjust the query number
    }
    url2.search = new URLSearchParams(params2).toString();
    const options2={
      method:'GET',
      headers:{'Authorization':data1.token_type+' '+data1.access_token}
    }
    const res2=await fetch(url2,options2);
    const data2=await res2.json();
    
    const uriIds=data2.tracks.items.map((item)=>{return item.id}); //filtering the data to have relevant fields only
   
    return uriIds; //return a array of relevant fields
  }
  catch(e){
    console.log(e);
  }
  
}

// app.get("/chatbot", function (req, res) {
//   res.set({
//     "Access-control-Allow-Origin": "*",
//   });
//   return res.render("index");
// });

app.listen(port, () => {
  console.log("Running on port" + port);
});

const server = http.createServer(app);
socketServer.registerSocketServer(server);
mongoose.set("strictQuery", false);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     server.listen(27017, () => {
//       console.log(`Server is listening on ${27017}`);
//     });
//   })
//   .catch((err) => {
//     console.log("database connection failed. Server not started");
//     console.error(err);
//   });
mongoose.connect("mongodb://127.0.0.1:27017/playTopia", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .on("error", function (err) {
    console.log(err);
  });
