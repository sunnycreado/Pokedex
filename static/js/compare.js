const colors = {
    grass: "#d2f2c2",
    poison: "#f7cdf7",
    fire: "#ffd1b5",
    flying: "#eae3ff",
    water: "#c2f3ff",
    bug: "#e0e8a2",
    normal: "#e6e6c3",
    electric: "#fff1ba",
    ground: "#e0ccb1",
    fighting: "#fcada9",
    psychic: "#ffc9da",
    rock: "#f0e09c",
    fairy: "#ffdee5",
    steel: "#e6eaf0",
    ice: "#e8feff",
    ghost: "#dbbaff",
    dragon: "#c4bdff",
    dark: "#a9abb0"
  };
  function getdd1()
  {   
  
      var pokemon1=document.getElementById("search1").value;
      var pokemon2=document.getElementById("search2").value;
      pokemon1=pokemon1.toLowerCase();
      pokemon2=pokemon2.toLowerCase();
  
  
  
      
      
      // var text1=(formid.dd1select[formid.dd1select.selectedIndex].text)
  
      // document.getElementById('lbl').innerHTML=text1
  
      function getpokemon(pokemon){
  
          var request = new XMLHttpRequest();
          var url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
          request.open("GET", url, true);
          request.send();
          request.onload = function() {
            status = request.status;
            if (request.status == 200) //if(statusText == OK)
            {
             const fetchPokemon = () =>{
                const url=`https://pokeapi.co/api/v2/pokemon/${pokemon}`
                fetch(url)
                   .then(res=>{
                      return res.json();
                   })
                   .then( data =>{
                      
                      var pokemon_name=data.name
                      var pokemon_name=pokemon_name.charAt(0).toUpperCase() + pokemon_name.slice(1);
                      console.log(pokemon_name)
                      var url_id=data.sprites.other["official-artwork"].front_default;
                      var hp=data.stats[0].base_stat;
                      var attack=data.stats[1].base_stat;
                      var defense=data.stats[2].base_stat;
                      var sp_attack=data.stats[3].base_stat;
                      var sp_defense=data.stats[4].base_stat;
                      var speed=data.stats[5].base_stat;
                      var type=data.types[0].type.name
                      document.getElementById("card").style.background=colors[type];
                      // card.style.background = colors[type[0]];
                      // var type=type.charAt(0).toUpperCase() + type.slice(1);
                      if (data.types[1]) {
                          var subtype=data.types[1].type.name
                          // var subtype=subtype.charAt(0).toUpperCase() + subtype.slice(1);
                      }
                      else{
                          var subtype=""
                      }
                      // 
                      // var url_id=data.sprites['front_default'];
                      console.log(url_id,hp,attack,defense,sp_attack,sp_defense,speed,type,subtype)
                      document.getElementById("result_pic").src=url_id;
                      document.getElementById('result_name').innerHTML=pokemon_name
                      document.getElementById('result_hp').innerHTML=hp
                      document.getElementById('result_speed').innerHTML=speed
                      document.getElementById('result_attack').innerHTML=attack
                      document.getElementById('result_defense').innerHTML=defense
                      document.getElementById('result_special_attack').innerHTML=sp_attack
                      document.getElementById('result_special_defense').innerHTML=sp_defense
                      document.getElementById('result_type').innerHTML=type
                      document.getElementById('result_subtype').innerHTML=subtype
          
                   })
             };
             fetchPokemon();
            } else {
             var url_id=`https://i.ibb.co/P4GgrvY/icon-for-question-1.png`
             document.getElementById("result_pic").src=url_id;
             console.log("image doesn't exist");
             swal(`${pokemon}!`, "Pokemon 1 does not Exist! Try Again!", "error");
            }
          }
  
      }
  
      function getpokemon1(pokemon){
  
          var request = new XMLHttpRequest();
          var url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
          request.open("GET", url, true);
          request.send();
          request.onload = function() {
            status = request.status;
            if (request.status == 200) //if(statusText == OK)
            {
             const fetchPokemon = () =>{
                const url=`https://pokeapi.co/api/v2/pokemon/${pokemon}`
                fetch(url)
                   .then(res=>{
                      return res.json();
                   })
                   .then( data =>{
                      
                      var pokemon_name=data.name
                      var pokemon_name=pokemon_name.charAt(0).toUpperCase() + pokemon_name.slice(1);
                      console.log(pokemon_name)
                      var url_id=data.sprites.other["official-artwork"].front_default;
                      var hp=data.stats[0].base_stat;
                      var attack=data.stats[1].base_stat;
                      var defense=data.stats[2].base_stat;
                      var sp_attack=data.stats[3].base_stat;
                      var sp_defense=data.stats[4].base_stat;
                      var speed=data.stats[5].base_stat;
                      var type=data.types[0].type.name
                      document.getElementById("card1").style.background=colors[type];
                      // var element = document.getElementById('card1');
                      // console.log(element)
                      var type=type.charAt(0).toUpperCase() + type.slice(1);
                      if (data.types[1]) {
                          var subtype=data.types[1].type.name
                          var subtype=subtype.charAt(0).toUpperCase() + subtype.slice(1);
                      }
                      else{
                          var subtype=""
                      }
                      // 
                      // var url_id=data.sprites['front_default'];
                      console.log(url_id,hp,attack,defense,sp_attack,sp_defense,speed,type,subtype)
                      document.getElementById("result_pic1").src=url_id;
                      document.getElementById('result_name1').innerHTML=pokemon_name
                      document.getElementById('result_hp1').innerHTML=hp
                      document.getElementById('result_speed1').innerHTML=speed
                      document.getElementById('result_attack1').innerHTML=attack
                      document.getElementById('result_defense1').innerHTML=defense
                      document.getElementById('result_special_attack1').innerHTML=sp_attack
                      document.getElementById('result_special_defense1').innerHTML=sp_defense
                      document.getElementById('result_type1').innerHTML=type
                      document.getElementById('result_subtype1').innerHTML=subtype
          
                   })
             };
             fetchPokemon();
            } else {
             var url_id=`https://i.ibb.co/P4GgrvY/icon-for-question-1.png`
             document.getElementById("result_pic1").src=url_id;
             console.log("image doesn't exist");
             swal(`${pokemon}!`, "Pokemon 2 does not Exist! Try Again!", "error");
            }
          }
  
      }
  
      getpokemon(pokemon1)
      getpokemon1(pokemon2)
  
  }
  
  function getdd2(){
  
  
  
  
      var pokemon_name1=document.getElementById('result_name').innerHTML
      var hp1=document.getElementById('result_hp').innerHTML
      var speed1=document.getElementById('result_speed').innerHTML
      var attack1=document.getElementById('result_attack').innerHTML
      var defense1=document.getElementById('result_defense').innerHTML
      var sp_attack1=document.getElementById('result_special_attack').innerHTML
      var sp_defense1=document.getElementById('result_special_defense').innerHTML
      var type1=document.getElementById('result_type').innerHTML
      type1=type1.toLowerCase()
      var element1 = colors[type1]
  
  
      var pokemon_name2=document.getElementById('result_name1').innerHTML
      var hp2=document.getElementById('result_hp1').innerHTML
      var speed2=document.getElementById('result_speed1').innerHTML
      var attack2=document.getElementById('result_attack1').innerHTML
      var defense2=document.getElementById('result_defense1').innerHTML
      var sp_attack2=document.getElementById('result_special_attack1').innerHTML
      var sp_defense2=document.getElementById('result_special_defense1').innerHTML
      var type2=document.getElementById('result_type1').innerHTML
      type2=type2.toLowerCase()
      console.log(type2)
      var element2 = colors[type2]
      console.log(element2)
      if (element1==element2)
      {
        element2='#fd46ab'
      }
  
  
  
  
      var data = {
        labels: ['HP','Speed','Attack', 'Defense', 'Special Attack', 'Special Defense'],
        datasets: [{
          label: `${pokemon_name1}`,
          data: [hp1, speed1, attack1, defense1, sp_attack1, sp_defense1],
          fill: true,
          backgroundColor: `${element1+'66'}`,
          borderColor: `${element1}`,
          pointBackgroundColor: `${element1}`,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: `${element1}`
        }, {
          label: `${pokemon_name2}`,
          data: [hp2, speed2, attack2, defense2, sp_attack2, sp_defense2],
          fill: true,
          backgroundColor: `${element2+'66'}`,
          borderColor: `${element2+'ff'}`,
          pointBackgroundColor: `${element2}`,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: `${element2+'ff'}`
        }]
      };
  
      var config = {
        type: 'radar',
        data: data,
        options: {
          elements: {
            line: {
              borderWidth: 3
            }
          },
          "responsive": true,
          "maintainAspectRatio": false
        },
      };
  
  
      
      var myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
  
      myChart.update();
  
        $(".submit-button1").on('click', function() {
          $(".custom-model-main").addClass('model-open');
          }); 
  
        $(".close-btn, .bg-overlay").click(function(){
        $(".custom-model-main").removeClass('model-open');
        });
  
  
  }