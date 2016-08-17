var express = require('express');
var router = express.Router();
var fs = require('fs');
var progress = require('progress-stream');
var youtubedl = require('youtube-dl');

function download(res,link){
   var video = youtubedl(link,
      // Optional arguments passed to youtube-dl.
      ['--format=18'],
      // Additional options can be given for calling `child_process.execFile()`.
      { cwd: __dirname });

   // Will be called when the download starts.
   video.on('info', function(info) {
      console.log('Download started');
      console.log('filename: ' + info._filename);
      console.log('size: ' + info.size);
      console.log('title:', info.title);
      console.log('format id:', info.format_id);
      //var filename = '/home/direwolf/my_git_repos/BIT-Downloader/download/'+info.title+'.mp4';
      var filename = '/media/direwolf_424/dc/request/'+info.title+'.mp4';
      var str = progress({
         length: info.size,
         time: 100 /* ms */
      });

      str.on('progress', function(progress) {
         console.log(progress.percentage+' '+(progress.speed/1024));
      });
      var stream = video.pipe(str).pipe(fs.createWriteStream(filename));
      stream.on('finish',function(){
         //res.status(200).json("{'message':'completed download'}");
         res.send('hello world');
      });
   });
}

/* GET home page. */
router.get('/', function(req, res, next) {
   download(res,req.query.link);
   //res.send('hello world');
});

module.exports = router;
