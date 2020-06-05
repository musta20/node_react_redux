const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true});


exports.mongoose = mongoose;