var express = require('express');
var router = express.Router();
var fs = require('fs');
var cars = require('./data/cars');
var carsB = require('./data/cars_black');
/* GET lang_list listing. */
router.get('/', function (req, res) {
    var options = "";
console.log("+");
    res.end(options);
});
// router.post('/search', function (req, res) {
//     var options = "";
//     for(var i =0;i<cars.length;i++) {
//         if(cars[i].name.match(req.param('name')) ){
//             options += "<tr>" +
//                 "<td class="+"number"+">" + cars[i].number + "</td>" +
//                 "<td>" + cars[i].name + "</td>" +
//                 "<td>" + cars[i].fullName + "</td>" +
//                 "<td>" + cars[i].phoneNumber + "</td>" +
//                 "<td>" + cars[i].arrivalDate + "</td>" +
//                 "<td>" + cars[i].dateOfDeparture + "</td>" +
//                 "</tr>";
//         };
//     };
//     var now = new Date();
//     console.log(now);
//
//     res.status(200).send(options);
// });
//
// router.post('/delete', function (req, res) {
//     var temp = [];
//     for(var i =0;i<cars.length;i++) {
//         req.param(cars[i].id) === "true" ? delete cars[i] : temp.push(cars[i]);
//     }
//     cars = temp;
//     res.status(200).send();
// });
// router.post('/add', function (req, res) {
//     for(var i =0;i<carsB.length;i++) {
//         // console.log(carsB[i]);
//         if(carsB[i].number===req.param('number')||carsB[i].phoneNumber===req.param('phoneNumber')){
//             res.status(200).send();
//             return false;
//         }
//     }
//     var nextId = 0;
//     cars.length >0 ?nextId =cars[cars.length-1].id+1:nextId=11101;
//     cars.push({
//         id: nextId,
//         number: req.param('number'),
//         name: req.param('name'),
//         fullName: req.param('fullName'),
//         phoneNumber: req.param('phoneNumber'),
//         arrivalDate: req.param('arrivalDate'),
//         dateOfDeparture: req.param('dateOfDeparture')
//     });
//     res.status(200).send();
// });
// router.post('/check', function (req, res) {
//     for(var i =0;i<carsB.length;i++) {
//         // console.log(carsB[i]);
//         if(carsB[i].number===req.param('number')){
//             res.status(200).send({ans:'false'});
//             return false;
//         }
//     }
//     res.status(200).send({ans:'true'});
// });
//
// router.post('/dellall', function (req, res) {
//     var temp = [];
//     for (var i = 0; i < cars.length; i++) {
//         var now = new Date();
//
//         var now1 = new Date(cars[i].dateOfDeparture);
//
//         console.log(now.getTime() + "    " + now1.getTime());
//         if (now.getTime() - now1.getTime() < 0) {
//             temp.push(cars[i]);
//         }else {
//
//         }
//     }
//     cars =temp;
//     res.status(200).send({ans:'true'});
// });
module.exports = router;
