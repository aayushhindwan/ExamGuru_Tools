var NAME = 'Slides of Words';

var deck;
var text = "";
var searchtext = "";
var title= "";
var words = [];
var searchinfo = [];
var slideshowLink = "#";
var ress;
var res11;

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index').setTitle("Automatic Vocabulary Slideshow Generator");
}

function getPresentationLink() {
  return slideshowLink;
}

function processForm(formObject) {
  
  try {
    slideTitle = formObject.title;
 
 
    words = textToArray(removeNumbering(formObject.words));
    searchinfo = textToArray(formObject.searchinfo);
    
    deck = SlidesApp.create(NAME + ' - ' + slideTitle);
    var [title, subtitle] = deck.getSlides()[0].getPageElements();
    title.asShape().getText().setText(slideTitle);
    subtitle.asShape().getText().setText("--------------------------------");
   //  var[x,y] = deck.getSlides()[1].getPageElements();
   //  x.asShape().getText().setText('hey');
    words.forEach(addImageSlide);
    
    var fileId = deck.getId();
    
    convertFileToPptx(fileId, NAME + ' - ' + slideTitle);
    
    return ["OK",fileId];
  } catch (f) {
    return f.toString();
  }
}

function removeNumbering(phrase) {
  var reg = /[0-9]*(\.|\))\s*/g;
  formatted = phrase.replace(reg, "");
  return formatted;
}

function textToArray(words) { 
    return words.split(/\r?\n/);
}

function convertFileToPptx(id, title) {

  var outputFileName = title+".pptx";

  var url = 'https://docs.google.com/presentation/d/'+id+'/export/pptx?access_token=' + ScriptApp.getOAuthToken();
  var rootFolder = DriveApp.getRootFolder();
  var response = UrlFetchApp.fetch(url);
  var blobPptx = response.getBlob();
  var result = rootFolder.createFile(blobPptx.setName(outputFileName));
}

/**
 * Creates a single slide for a given word;
 * used directly by foreach(), hence the parameters are fixed.
 * @param {string} word A String object representing a word
 * @param {number} index The index into the array
 */
function addImageSlide(word, index) {
  
    var slide = deck.appendSlide(SlidesApp.PredefinedLayout.SECTION_HEADER);
  
    var imageUrl = getImageURL(searchinfo[index]);
   var imageUrl1 = getImageURL(searchinfo[index]);
    var image = slide.insertImage(imageUrl);
 // var xx = slide.insertImage(imageUrl1);
    var [title, body] = slide.getPageElements();
   //   var xyz2="https://api.datamuse.com/words?ml="+encodeURIComponent(searchinfo[index]);
  // var res12=UrlFetchApp.fetch(xyz2);
   //   var res2= res12.getContentText();
   //    var json=JSON.parse(res2);
//  var ff=json[0].
    //  var box1=slide.insertTextBox();
 
  //var xyz="https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&format=json&exintro=&titles="+ encodeURIComponent(searchinfo[index]);
/*var xyz="https://api.wolframalpha.com/v1/result?i=" +encodeURIComponent(searchinfo[index])+"&appid=4A4WHA-EP45XV5PKL&json=true";
  var res1=UrlFetchApp.fetch(xyz);
 var res = JSON.parse(res1);*/

  // firstKey=Object.keys(res.query.pages)[0];
   //var tt=res.query.pages[firstKey].extract;
  
  var xyz="https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&format=json&exintro=&titles="+ encodeURIComponent(searchinfo[index]);

  var res15=UrlFetchApp.fetch(xyz);
 var res22 = JSON.parse(res15);

   firstKey=Object.keys(res22.query.pages)[0];
   var tt=res22.query.pages[firstKey].extract;
  var i;
  var p=0;
  var kk="";
  for(i=0;i<tt.length;i++)
  {
    if(tt[i]=='.')
    {
      p=p+1;
    }
   kk=kk+tt[i];
    if(p==5)
      break;
    
  }
  
    var box=slide.insertTextBox(kk);
  
  box.setWidth(400);
  box.setLeft(300).setTop(150);
  box.getText().getTextStyle().setFontSize(10);
    title.asShape().setTop(20);
    title.asShape().getText().setText(searchinfo[index]);
 

    title.asShape().getText().getTextStyle().setFontSize(60);
      title.asShape().getText().getTextStyle().setBold(true);
  
    var imgWidth = image.getWidth();
    var imgHeight = image.getHeight();
    var imgRatio = imgWidth / imgHeight;
    var pageWidth = deck.getPageWidth();
    var pageHeight = deck.getPageHeight();
  
    var newHeight = pageHeight-200;
    var newWidth = imgRatio * newHeight;
    image.setHeight(newHeight);
    image.setWidth(newWidth/1.5);
    
    var newX = pageWidth/2. - newWidth/2.;
    var newY = pageHeight/2. - newHeight/2.;
  
    image.setLeft(20).setTop(150);
}


function main() {
  
}
