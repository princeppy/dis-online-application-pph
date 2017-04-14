var router    = require('express').Router();
var four0four = require('./utils/404')();

var data      = require('./datas');
var dataAC    = require('./academicyears');
var dataTw    = require('./towns');

router.get('/datas/:type?', getTypes);
router.get('/grouped/datas', getGroupedTypes);
router.get('/towns', getTowns);
router.get('/academicyears/:year?', getAcademicYears);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getTowns(req, res, next) {
  res.status(200).send(dataTw.towns);
}

function getAcademicYears(req, res, next) {
  var acYear = (req.params.year||'').trim();
  var _d;

  if(acYear.length===0) {    
    _d = dataAC.academicyears;
  } else {
    _d = dataAC.academicyears.filter(function(p) {
      return p.code.trim() === acYear.trim();
    });
  }

  res.status(200).send(_d);
}

function getGroupedTypes(req, res, next) {
    res.status(200).send(groupBy(data.datas,'type'));
}

function getTypes(req, res, next) {
  var type = (req.params.type||'').trim();
  var types;
  if(type.length===0) {
    types = data.datas;
  } else {
    types = data.datas.filter(function(p) {
      return p.type.trim() === type.trim();
    });
  }

  if (types) {
    res.status(200).send(types);
  } else {
    four0four.send404(req, res, 'datas of ' + type + ' not found');
  }
}

function groupBy(itemArray,groupKey){
	return itemArray.reduce(function(item, e) {
  	if (item.indexOf(e[groupKey]) === -1 ) { item.push(e[groupKey]); }
    return item;
  }, [])
  .map(function(key) {
  	return {
    	'key': key,
      'items': itemArray.filter(function(_el) {return _el[groupKey] === key;})
  	}    
  });
}