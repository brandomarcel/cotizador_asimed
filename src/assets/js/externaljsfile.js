var h="vacio";
 function externo(url){
    
    var t=P.init(url,'_system','location=yes');
    console.log(t)
       
    console.log(P)

    var tiempo= 0;
    var interval = setInterval(function(){

        
         //Comprobamos que la ventana no este cerrada

        if(t.closed !== false) {
          //Si la ventana ha sido cerrada, limpiamos el contador
          t.clearInterval(interval)
          //this.modalController.dismiss();
         alert(`Tiempo total: ${tiempo} s `)
         
        

        } else {
          //Mientras no se cierra la ventana sumamos los segundos
          tiempo +=1;
        }


    },1000)


   /*  console.log(P.closeFrame())
    if(P.closed !== false){
console.log("cerrado");
    }else{
        console.log("abierto");
    }
    console.log(P.closed);
*/
} 

 function guardado(){

    P.on('response',  function (data){
        //alert(JSON.stringify(data, null, 2));
        
        h=  (JSON.stringify(data, null, 2))
       
        localStorage.setItem('datos', JSON.stringify(data, null, 2));
 

    });

return h;
}