const express = require("express");
const path = require("path"); 
const fs = require('node:fs');

//cmments for revision


const app = express(); //created app

app.set("view engine", "ejs"); //setting view engine for backend pages


//for handling requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images) from /public
app.use(express.static(path.join(__dirname, "public")));


function capitalizeWords(str) {
  // Split the string into an array of words
  const words = str.split(' ');

  // Map over each word to capitalize its first letter
  const capitalizedWords = words.map(word => {
    if (word.length === 0) {
      return ''; // Handle empty strings or multiple spaces
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the capitalized words back into a single string
  return capitalizedWords.join(' ');
}



app.get("/", function (req, res) {

  fs.readdir( `./tasks`, function(err,files){
    console.log(files);
    // res.send("hello")

    //renders index.ejs and sends files to be used in ejs file
    res.render("index",{files:files});
  } )

  
});


app.post("/add-task", function (req, res) {
  let title = req.body.title;
  let content = req.body.desc;

  // console.log(title);

  if (!title && !content) {
    console.log("empty fields")
    title=" "
    content=" "
    // res.redirect("/")
  }

  else if (!title ) {
    console.log("empty field")
    title="no title"
    // res.redirect("/")
  }

  else if (!content ) {
    console.log("empty field")
    content="write something here"
    // res.redirect("/")
  }

  const directoryPath = "./tasks";
  const fileName = `${capitalizeWords(title).split(" ").join('')}.txt`;
  const filePath = path.join(directoryPath, fileName);

  fs.mkdir(directoryPath, { recursive: true }, (err) => {
    if (err) res.redirect("/")

    fs.writeFile(filePath, content, (err) => {
      if (err) {
        res.redirect("/")
      }

      // ✅ Send response only once
      console.log("saved todo")
      res.redirect("/")
    });
  });
});


app.get("/read/:file",function(req,res){
  const fileName = req.params.file;
  const path=`./tasks/${fileName}`
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    res.render("content",{ title:fileName.split(".")[0] , content:data });
  });
});

// app.get("/back",function(req,res){
//   res.redirect("/");
// })

app.get("/edit/:file", (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join(__dirname, "tasks", fileName); // adjust path as needed

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send("Failed to read task");
    }

    res.render("editPage", {
      content: data,
      title: fileName.split('.')[0]
    });
  });
});


app.post("/edited/:file", (req, res) => {
    const newname = req.body.title;
    const oldfilename = req.params.file;
    const newcontent = req.body.desc;
    // Construct full paths relative to your application's root
    // It's crucial to use path.join to handle directory separators correctly
    // const path = require('path');
    const tasksDir = path.join(__dirname, 'tasks'); // Assuming 'tasks' is a direct child of your app.js directory

    const oldpath = path.join(tasksDir, `${oldfilename}`);
    const newpath = path.join(tasksDir, `${newname}.txt`);

    // 1. First, rename the file
    fs.rename(oldpath, newpath, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
            // Crucial: Send an error response if renaming fails
            // Consider sending a 500 status code for server errors
            return res.status(500).send('Error renaming file. Please try again.');
        }

        console.log('File renamed successfully!');

        // 2. ONLY IF renaming is successful, then write the new content to the NEWLY renamed file
        fs.writeFile(newpath, newcontent, (err) => {
            if (err) {
                console.error('Error writing content to file:', err);
                // Send an error response if writing fails
                return res.status(500).send('Error saving changes to file. Please try again.');
            }

            // Both operations succeeded, now redirect
            console.log("Changes saved and file renamed successfully!");
            res.redirect("/");
        });
    });
});


app.get("/read/back/:file",function(req,res){
  res.redirect("/");
});

app.get("/delete/:file",function(req,res){
  const fileName = req.params.file;
  const path=`./tasks/${fileName}`
  fs.unlink(path,err => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    res.redirect('/');
  });
});

app.get("/read/delete/:file",function(req,res){
  res.redirect(`/delete/${req.params.file}`);
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


