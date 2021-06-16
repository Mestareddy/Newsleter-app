const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mailchimp = require("@mailchimp/mailchimp_marketing")

app.use(express.static("public"))
// app.use(express.json)
app.use(express.urlencoded({
    extended: true
}))

mailchimp.setConfig({
    apiKey: "d58e139d91a5e53ef808bf4f74e32db7-us6",
    server: "us6",
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const listId = "0870c952cc";
    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
        res.sendFile(__dirname + "/success.html")
        console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id}.`
        );
    }

    run().catch(e => res.sendFile(__dirname + "/failure.html"));

})

app.post("/failure", (req, res) => {
    res.redirect("/")
})



app.listen(port, () => console.log(`Example app listening on port: ` + port))


// api key
// d58e139d91a5e53ef808bf4f74e32db7-us6


// list id
// 0870c952cc











// const express = require("express");
// const https = require("https");
// const { post } = require("request");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// }));
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/signup.html");
// });

// app.post("/", (req, res) => {
//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const email = req.body.email;
//     // console.log(firstName + lastName + email);

//     const data = {
//         members: [{
//             email_address: email,
//             status: "subscribed",
//             merge_fields: {
//                 FNAME: firstName,
//                 LNAME: lastName
//             }
//         }]
//     };

//     const jsonData = JSON.stringify(data);

//     const url = "https://us6.api.mailchimp.com/3.0/lists/0870c952cc"
//     const options = {
//         method: "POST",
//         auth: "eddy1:d58e139d91a5e53ef808bf4f74e32db7-us6"
//     }

//     const request = https.request(url, options, (response) => {

//         if (response.statusCode === 200) {
//             res.sendFile(__dirname + "/success.html");
//         } else {
//             console.log(data)
//             res.sendFile(__dirname + "/failure.html");
//         }

//         // response.on("data", (data) => {
//         //     console.log(JSON.parse(data));
//         // });
//     });
//     //request.write(jsonData);
//     request.end();
// });

// app.post("/failure", (req, res) => {
//     res.redirect("/");
// });

// app.listen(process.env.PORT || 3000, () => {console.log("Server is running on port 3000.");})


// // api key
// // d58e139d91a5e53ef808bf4f74e32db7-us6


// // list id
// // 0870c952cc