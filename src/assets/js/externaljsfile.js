async function externo(url){
    
    var h;
    P.init(url);
    await P.on('response', async (data) =>{
        //alert(JSON.stringify(data, null, 2));
        
        console.log(data)
        //h=  (JSON.stringify(data, null, 2))
       
        localStorage.setItem('datos', JSON.stringify(data, null, 2));
   
        
        return data;
       
    });
  
    
 



   
}

async function guardado(data){
   
    console.log(data)
}