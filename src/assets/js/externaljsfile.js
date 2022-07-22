var h;
 function externo(url){
    
    P.init(url,);
   /*  P.on('response', function (data) {
       console.log(JSON.stringify(data, null, 2));
       h="probando"
    }); */
//guardado();

} 

 function guardado(){

    P.on('response',  function (data){
        //alert(JSON.stringify(data, null, 2));
        
        h=  (JSON.stringify(data))
       
        
        sessionStorage.setItem('status', h);
 

    });

return h;
}