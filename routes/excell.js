require('dotenv').config()

var express     = require('express');
var router      = express.Router();
var request     = require('request');
// var json2xls    = require('json2xls');
var fs          = require('fs');


/* GET users listing. */
router.post('/import', function(req, res, next) {
  //code Angga disini
  res.send('respond with a resource');
});

router.get('/export', function(req, res, next) {
    let endpoint =  '/problem/clasification/import'
    request(`${process.env.APP_HOST}` + endpoint, function(error, response, body){
        // # parse
        let bodyData = JSON.parse(body)

        let arrayNew = [];
        bodyData.data.forEach(element => {
          let period;
          if(element.period){
             period = element.period.split('.');
          } else {
            period = ['', '']
          }

          let year = period[1]
          let month = period[0]

          let data = {
            Estate: (element.estate) ? element.estate : '',
            Div: (element.divisi) ? element.divisi : '',
            Block: (element.block) ? element.block : '',
            Year: year,
            'Area (ha)': (element.area) ? element.area : '',
            'Ach (%)': (element.achievement) ? element.achievement : '',
            Color: (element.color_name) ? element.color_name : '',
            'Problem Classification': (element.name) ? element.name : '',
            'Detail Problem': (element.problem_detail) ? element.problem_detail : '',
            'Action Plan': (element.action_plan) ? element.action_plan : '',
            'Area (Ha) yang bermasalah': (element.problem_area) ? element.problem_area : '',
            'Luasan / Besaran': (element.problem_scale) ? element.problem_scale : '',
            'Kemajuan / Progress': (element.progress) ? element.progress : '',
            'Unit': (element.unit) ? element.unit : '', 
            'Selesai (%)': (element.finished) ? element.finished : '',
            'Tgl Mulai': (element.start_date) ? element.start_date : '',
            'Tgl Selesai': (element.end_date) ? element.end_date : '',
            'Biaya yang Diperlukan': (element.cost) ? element.cost : '',
            'PIC': (element.PIC) ? element.PIC : '',
            id_detail_problem: (element.id_detail_problem) ? element.id_detail_problem : '',
            Komentar: (element.comment) ? element.comment : ''
          }
          arrayNew.push(data)
        });

        let date = Date.now()
        let name = 'excell/promblem_clasification_'+date+'.xlsx'

        require('json2xlsx').write(name, 'Sheet1', arrayNew)
        // let xls = json2xls(arrayNew)
        // fs.writeFileSync(name, xls, 'binary')
        res.download(name);
    })
  });

module.exports = router;
