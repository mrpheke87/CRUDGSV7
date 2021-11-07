function doGet(e){
  
  var op = e.parameter.action;
  var ss=SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1o6rVfwozX7h9-6rlQVsKFa1cTYFFXlMo_LjePZ-QJjQ/edit?usp=sharing");//////////////
  var sheet = ss.getSheetByName("DATA");
 
  if(op=="insert")
    return insert_value(e,sheet);

  if(op=="read")
    return read_value(e,ss);
  
  if(op=="update")
    return update_value(e,sheet);
  
  if(op=="delete")
    return delete_value(e,sheet);
  
   else{  return HtmlService.createTemplateFromFile('index')/////////////
      .evaluate().setTitle('DATA SISWA'); }
}

function insert_value(request,sheet){
  var id = request.parameter.id;
  var nama = request.parameter.nama;
  var gender = request.parameter.gender;
  var kelas = request.parameter.kelas;
  var alamat = request.parameter.alamat;
  var email = request.parameter.email;
  var kontak = request.parameter.kontak;//////////
  
  var flag=1;
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
    var id1 = sheet.getRange(i, 2).getValue();
    if(id1==id){
      flag=0;
  var result="ID sudah ada!!";
    } }
   if(flag==1){
  var d = new Date();
    var currentTime = d.toLocaleString();
  var rowData = sheet.appendRow([currentTime,id,nama,gender,kelas,alamat,email,kontak]);  
  var result="Data berhasil ditambahkan!!";
  }
     result = JSON.stringify({
    "result": result
  });  
    
  return ContentService
  .createTextOutput(request.parameter.callback + "(" + result + ")")
  .setMimeType(ContentService.MimeType.JAVASCRIPT);   
  }

function read_value(request,ss){
  var output  = ContentService.createTextOutput(),
      data    = {};
  
//Jika Anda lupa mengganti nama sheet di sini tidak akan dapat memuat data untuk ditampilkan
  var sheet="DATA";/////////////////////////
  data.records = readData_(ss, sheet);
  var callback = request.parameters.callback;
  if (callback === undefined) {
    output.setContent(JSON.stringify(data));
  } else {
    output.setContent(callback + "(" + JSON.stringify(data) + ")");
  }
  output.setMimeType(ContentService.MimeType.JAVASCRIPT);
  return output;
}

function readData_(ss, sheetname, properties) {
  if (typeof properties == "undefined") {
    properties = getHeaderRow_(ss, sheetname);
    properties = properties.map(function(p) { return p.replace(/\s+/g, '_'); });
  }
  var rows = getDataRows_(ss, sheetname),
      data = [];
  for (var r = 0, l = rows.length; r < l; r++) {
    var row     = rows[r],
        record  = {};
    for (var p in properties) {
      record[properties[p]] = row[p];
    }
    data.push(record);
  }
  return data;
}

function getDataRows_(ss, sheetname) {
  var sh = ss.getSheetByName(sheetname);
  return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
}

function getHeaderRow_(ss, sheetname) {
  var sh = ss.getSheetByName(sheetname);
  return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];  
} 
  
function update_value(request,sheet){
var output  = ContentService.createTextOutput();
  var id = request.parameter.id;
  var nama = request.parameter.nama;
  var gender = request.parameter.gender;  
  var kelas = request.parameter.kelas; 
  var alamat = request.parameter.alamat;
  var email = request.parameter.email;
  var kontak = request.parameter.kontak;//////////////////
  var flag=0;
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
    var rid = sheet.getRange(i, 2).getValue();
    if(rid==id){
      sheet.getRange(i,3).setValue(nama);
      sheet.getRange(i,4).setValue(gender);
      sheet.getRange(i,5).setValue(kelas);
      sheet.getRange(i,6).setValue(alamat);
      sheet.getRange(i,7).setValue(email);
      sheet.getRange(i,8).setValue(kontak);//////////////////
      var result="Data berhasil diupdate!!";
      flag=1;
    }
}
  if(flag==0)
    var result="ID tidak ditemukan!";
  
   result = JSON.stringify({
    "result": result
  });  
    
  return ContentService
  .createTextOutput(request.parameter.callback + "(" + result + ")")
  .setMimeType(ContentService.MimeType.JAVASCRIPT);   
}

function delete_value(request,sheet){
  var output  = ContentService.createTextOutput();
  var id = request.parameter.id;
  var nama = request.parameter.nama;
  var gender = request.parameter.gender;
  var kelas = request.parameter.kelas;
  var alamat = request.parameter.alamat;
  var email = request.parameter.email;
  var kontak = request.parameter.kontak;///////////////////
  var flag=0;
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
    var rid = sheet.getRange(i, 2).getValue();
    if(rid==id){
      sheet.deleteRow(i);
      var result="Data berhasil dihapus!";
      flag=1;
    }
  }
  if(flag==0)
    var result="ID tidak ditemukan!";
   result = JSON.stringify({
    "result": result
  });  
    
  return ContentService
  .createTextOutput(request.parameter.callback + "(" + result + ")")
  .setMimeType(ContentService.MimeType.JAVASCRIPT);   
}