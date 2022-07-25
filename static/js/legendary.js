$(".submit-button").on('click', function() {
   console.log("hello");
  }); 

// var obj = {};

function getdd1()
{   


   
   
   var e=document.getElementById("form_selector");
   var text1=e.value;
   // var text1=(formid.dd1select[formid.dd1select.selectedIndex].text)
   console.log(text1)
   console.log(parsed)
   var small=text1.toLowerCase();

   function checkImage(url) {
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.send();
      request.onload = function() {
        status = request.status;
        if (request.status == 200) //if(statusText == OK)
        {
         const fetchPokemon = () =>{
            const url=`https://pokeapi.co/api/v2/pokemon/${small}`
            fetch(url)
               .then(res=>{
                  return res.json();
               })
               .then( data =>{
                  const img_url="";
                  var url_id=data.sprites.other["official-artwork"].front_default;
                  // var url_id=data.sprites['front_default'];
                  console.log(url_id)
                  document.getElementById("result_pic").src=url_id;
      
               })
         };
         fetchPokemon();
        } else {
         var url_id=`https://i.ibb.co/P4GgrvY/icon-for-question-1.png`
         document.getElementById("result_pic").src=url_id;
         console.log("image doesn't exist");
        }
      }
    }
    checkImage(`https://pokeapi.co/api/v2/pokemon/${small}`);

   // const fetchPokemon = () =>{
   //    const url=`https://pokeapi.co/api/v2/pokemon/${text1}`
   //    fetch(url)
   //       .then(res=>{
   //          return res.json();
   //       })
   //       .then( data =>{
   //          const img_url="";
   //          var url_id=data.sprites.other["official-artwork"].front_default;
   //          // var url_id=data.sprites['front_default'];
   //          console.log(url_id)
   //          document.getElementById("result_pic").src=url_id;

   //       })
   // };
   // fetchPokemon();


   document.getElementById('result_name').innerHTML=text1
   document.getElementById('result_hp').innerHTML=parsed[text1]['hp']
   document.getElementById('result_speed').innerHTML=parsed[text1]['speed']
   document.getElementById('result_attack').innerHTML=parsed[text1]['attack']
   document.getElementById('result_defense').innerHTML=parsed[text1]['defense']
   document.getElementById('result_special_attack').innerHTML=parsed[text1]['sp_attack']
   document.getElementById('result_special_defense').innerHTML=parsed[text1]['sp_defense']
   document.getElementById('result_gen').innerHTML=parsed[text1]['generation']
   document.getElementById('result_type').innerHTML=parsed[text1]['type']
   document.getElementById('result_subtype').innerHTML=parsed[text1]['subtype']
   document.getElementById('result_legend').innerHTML=parsed[text1]['legend']



   


   
  
   
   // document.write(parsed1[0]);

    console.log(parsed[text1]['algo']);
   
   var table = document.getElementById("mytable-body");
   table.innerHTML = "";
   var c=0;
   Object.keys(parsed[text1]['algo']).forEach(k => {
      // obj[text1][k] = myvar[k];

      var row = table.insertRow(c);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = k;
      cell2.innerHTML = parsed[text1]['algo'][k];
      console.log(k, ':', parsed[text1]['algo'][k]);
      c = c + 1;
    });
   // // var row = table.insertRow(0);
   // // var cell1 = row.insertCell(0);
   // // var cell2 = row.insertCell(1);
   // if(!obj[text1]){
   //    obj[text1] = {};
   //    var c = 0;
      
   //    Object.keys(myvar).forEach(k => {
   //       obj[text1][k] = myvar[k];

   //       // var row = table.insertRow(c);
   //       // var cell1 = row.insertCell(0);
   //       // var cell2 = row.insertCell(1);
   //       // cell1.innerHTML = k;
   //       // cell2.innerHTML = myvar[k];
   //       // console.log(k, ':', myvar[k]);
   //       // c = c + 1;
   //    });
   //    console.log(1111);
   // }
   
    
   //  console.log(obj);
    
   
   
}
  
  
  