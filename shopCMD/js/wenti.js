window.onload=function(){
    var oSt=document.getElementById('list');
    var aBtn=oSt.getElementsByTagName('a');
    var oCon=document.getElementById('cont_list');
    var aLi=oCon.getElementsByTagName('li');
    for(var i=0;i<aBtn.length;i++){
        aBtn[i].index=i;
        aBtn[i].onclick=function(){
            for(var i=0;i<aBtn.length;i++){
                aBtn[i].className='';
                aLi[i].className='';
            }
            this.className='active';
            aLi[this.index].className='show';
        }
    }
}