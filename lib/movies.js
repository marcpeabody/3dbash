var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/3dbash');

exports.load = function(){
  mongoose.model('Movie', {
    properties: ['title', 'up_count', 'down_count', 'is3D'],
    cast: {
      up_count: Number,
      down_count: Number,
    },
    indexes: ['title'],
    getters: {
      key: function(){
        return this._partials._id.toString().replace(/"/g,"");
      },
      votes: function(){
        return { votes:{ up:this.up_count, down: this.down_count, total: (this.up_count+this.down_count) } }
      }
    },
    static: {
      findByTitle: function(t){
        return this.find({title: t}).exec();
      }
    }
  });
}

