const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const favicon = require('serve-favicon');
const path = require("path");


module.exports = {express,bodyParser,cors,dotenv,cookieParser, favicon,path};