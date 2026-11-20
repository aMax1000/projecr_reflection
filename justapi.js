
const maxrenderscale=32767;
const maxsafevalue=Number.MAX_SAFE_INTEGER/(2*maxrenderscale)


    class Line{
        constructor(coef,move){
            this.coef=parseFloat(coef);
            this.move=parseFloat(move);
        }
        funct(x){
            return this.coef*x+this.move
        }
        isover(x,y){
            return ((x*this.coef+this.move)>y)
        }
        isunder(x,y){
            return ((x*this.coef+this.move)<y)
        }
        intersection(line){
            let co=(this.coef-line.coef);
            if(co){
            let x=(-this.move+line.move)/co;
            return [x,(x*this.coef+this.move)]
            }else{
                console.log("ERRROR PARALELING LINES")
            }
        }
        intersectionx(line){
            let co=(this.coef-line.coef);
            if(co){
            let x=(-this.move+line.move)/co;
            return x
            }else{
                console.log("ERRROR PARALELING LINES")
            }
        }
        intersectiony(line){
            let co=(this.coef-line.coef);
            if(co){
            let x=(-this.move+line.move)/co;
            return x*this.coef+this.move
            }else{
                console.log("ERRROR PARALELING LINES")
            }
        }
        rotated(){
            return new Line(-1/this.coef,this.move/this.coef)
        }
        reverse(){
            return new Line(-this.coef,-this.move)
        }
        strprint(){
            return `coef: ${this.coef}\nmove: ${this.move} \n`
        }
        yfilp(){
            return new Line(-this.coef,this.move)
        }
    };

    class Secarr{
        constructor(b=false){
            this.linearr=[];
            this.secup=[-maxsafevalue,10000000];
            this.b=b;
        }


        findcross(line){
            let i=0
            //console.log(`t1`)
            if(line.coef>this.linearr[i].coef){return -1}
            if(line.coef==this.linearr[i].coef && line.move<this.linearr[i].move){
                return -1
            }
            while(i<this.linearr.length && line.coef<this.linearr[i].coef){
                        //console.log("e3")
                        //console.log(line.intersectionx(this.linearr[i]))
                        //console.log(this.secup[i+1])
                        //main checker
                        if (line.intersectionx(this.linearr[i])<=this.secup[i+1]){
                            return i;
                        }
                        //console.log("e6")
                        i++
                }
                return -2
        }


         findcrossrev(line){
            //console.log(`t2`)
            let i=this.linearr.length-1
            //console.log(`this.secup[i] ${this.secup[i]}`)
            if(line.coef>this.linearr[i].coef){return this.linearr.length}
            if(line.coef==this.linearr[i].coef && line.move>this.linearr[i].move){
 return this.linearr.length
            }
            //console.log(`t21`)
            while(i>=0 && line.coef<this.linearr[i].coef){
                        //console.log("e3")
                        //console.log(line.intersectionx(this.linearr[i]))
                        //console.log(this.secup[i+1])
                        //main checker
                        if (line.intersectionx(this.linearr[i])<=this.secup[i+1]){
                            return i;
                        }
                        //console.log("e6")
                        i--
                }
                return -2
        }
        
        
        findcrossalt(line){
            let i=0
            //console.log(`t3`)
            if(line.coef<this.linearr[i].coef){return -1}
            //console.log(`t31`)
            if(line.coef==this.linearr[i].coef && line.move<this.linearr[i].move){
                return -1
            }
            while(i<this.linearr.length && line.coef>this.linearr[i].coef){
                        //console.log("e3")
                        //main checker
                        //console.log(line.intersectionx(this.linearr[i]))
                        //console.log(this.secup[i])
                        if (line.intersectionx(this.linearr[i])>=this.secup[i]){
                            return i;
                        }
                        //console.log("e6")
                        i++
                }
                return -2
        }


        findcrossrevalt(line){
            let i=this.linearr.length-1
            //console.log(`t4`)
            if(line.coef<this.linearr[i].coef){
                    return this.linearr.length
                }
            if(line.coef==this.linearr[i].coef && line.move<this.linearr[i].move){
                return this.linearr.length
            }
            while(i>=0 && line.coef>this.linearr[i].coef){
                        //console.log("e3")
                        //console.log(line.intersectionx(this.linearr[i]))
                        //console.log(this.secup[i])
                        //main checker
                        if (line.intersectionx(this.linearr[i])>=this.secup[i]){
                            return i;
                        }
                        //console.log("e6")
                        i--
                }
                return -2
        }


        addline(line){
            let ret=1;
            if(this.linearr.length==0){
                this.linearr[0]=line;
                //console.log("d1")
                return 4
            }
            let p1
            let p2
            if(this.b){
                p1=this.findcrossalt(line)
                if(p1==-2){return 0}
                p2=this.findcrossrev(line)
                if(p2==-2){return 0}
            }else{
                p1=this.findcross(line)
                if(p1==-2){return 0}
                p2=this.findcrossrevalt(line)
                if(p2==-2){return 0}
            }
            if(p2-p1<1){ console.log("ERROR p1-p2")}
            let counter=p2-p1-1;
           // console.log(!counter)
            
            let inter1;
            let inter2;
            if(p1!=-1){
                inter1=line.intersectionx(this.linearr[p1]);
            }else{
                inter1=-maxsafevalue
                ret=2
            }
            if(p2!=this.linearr.length){
                inter2=line.intersectionx(this.linearr[p2]);
                
            }else{
                inter2=maxsafevalue
                if(ret==2){
                    ret=4
                }else{
                    ret=3
                }
            }
            if(inter1!=inter2){
                this.secup.splice(p1+1,counter+1,inter1,inter2)
                this.linearr.splice(p1+1,counter,line)
            }
            return ret;
        }

        strprint(){
            let a= `sec:${this.secup[0]}\n\n`
            for(let i=0;i<this.linearr.length;i++){
                a+=this.linearr[i].strprint();
                a+=`\nsec: ${this.secup[i+1]}\n\n`
            }
            if(this.linearr.length==0){
                a+=`sec: ${this.secup[1]}\n`
            }
            return a
        }
    }



    class Fig{
        arrup;
        arrdown;
        intersectup;
        intersectdown;
        constructor(linearray=[]){
            this.arrup=new Secarr();
            this.arrdown=new Secarr(true);
            this.intersectup=-maxsafevalue
            this.intersectdown=maxsafevalue
            /*for(const line of linearray){
                if(line.move>0){
                    this.arrup.push(line)
                }else if(line.move<0){
                    this.arrdown.push(line)
                }else{
                    console.log("ERROR OF LINES 0")
                }
            }*/
        }

        cut(line){
            console.log("cut")
            if(this.arrdown.linearr.length!=0){
                console.log("cut2")
                if(line.coef>this.arrdown.linearr[0].coef){
                    console.log("cut3")
                    let index=this.arrdown.findcrossalt(line)
                    console.log(`index:${index}`)
                    const intersect=line.intersectionx(this.arrdown.linearr[index])
                    this.arrup.secup[0]=intersect
                    this.arrdown.secup.splice(0,index+1,intersect)
                    this.arrdown.linearr.splice(0,index)
                    this.intersectup=intersect
                }
            }
        }
        cutrev(line){
            console.log("cutrev")
            if(this.arrdown.linearr.length!=0){
                console.log("cutrev2")
                if(line.coef<this.arrdown.linearr[this.arrdown.linearr.length-1].coef){
                    console.log("cutrev3")
                    let index=this.arrdown.findcrossrev(line)
                    console.log(`index:${index}`)
                    const intersect=line.intersectionx(this.arrdown.linearr[index])
                    this.arrup.secup[this.arrup.secup.length-1]=intersect
                    this.arrdown.secup.splice(index+1,this.arrdown.secup.length-index,intersect)
                    this.arrdown.linearr.splice(index+1,this.arrdown.linearr.length-index)
                    this.intersectdown=intersect
                }
            }
        }
        cutalt(line){
            console.log("cutalt")
            if(this.arrup.linearr.length!=0){
                console.log("cutalt2")
                console.log(line)
                console.log(this.arrup.linearr[0])
                if(line.coef<this.arrup.linearr[0].coef){
                    console.log("cutalt3")
                    let index=this.arrup.findcross(line)
                    console.log(`index:${index}`)
                    const intersect=line.intersectionx(this.arrup.linearr[index])
                    this.arrdown.secup[0]=intersect
                    this.arrup.secup.splice(0,index+1,intersect)
                    this.arrup.linearr.splice(0,index)
                    this.intersectup=intersect
                }
            }
        }
        cutrevalt(line){
            console.log("cutrevalt")
            if(this.arrup.linearr.length!=0){
                if(line.coef>this.arrup.linearr[this.arrup.linearr.length-1].coef){
                    let index=this.arrup.findcrossrevalt(line)
                    console.log(`index:${index}`)
                    const intersect=line.intersectionx(this.arrup.linearr[index])
                    this.arrdown.secup[this.arrdown.secup.length-1]=intersect
                    this.arrup.secup.splice(index+1,this.arrup.secup.length-index,intersect)
                    this.arrup.linearr.splice(index+1,this.arrup.linearr.length-index)
                    this.intersectdown=intersect
                }
            }
        }

        addlinef(line){
            if(line.move>0){
                switch(this.arrup.addline(line)){
                    case 0:
                        return;
                    case 1:
                        return;
                    case 2:
                        this.cut(line)
                        break;
                    case 3:
                        this.cutrev(line)
                        break;
                    case 4:
                        this.cut(line)
                        this.cutrev(line)
                        break;
                }
            }else if(line.move<0){
                switch(this.arrdown.addline(line)){
                    case 0:
                        return;
                    case 1:
                        return;
                    case 2:
                        this.cutalt(line)
                        break;
                    case 3:
                        this.cutrevalt(line)
                        break;
                    case 4:
                        this.cutalt(line)
                        this.cutrevalt(line)
                        break;
                }
            }else{
                console.log(`move 0 ERROR`)
            }


        }
        strprint(){
            let a="ARRUP:\n\n"
            a+=this.arrup.strprint()
            a+="\n\n ARRDOWN:\n\n"
            a+=this.arrdown.strprint()
            return a;
        }  
    };





class Canvas{
    canvas;
    fig;
    renderscale;
    offsety;
    offsetx;
    constructor(canvas,renderscale=1,fig=new Fig,offsetx=canvas.width/2,offsety=canvas.height/2){
        this.canvas=canvas
        this.renderscale=renderscale
        this.offsetx=offsetx;
        this.offsety=offsety;
        this.fig=fig
    }

drawline(line,lim1,lim2){
    const ctx = this.canvas.getContext('2d');
    const canvasy1 = -this.offsety / this.renderscale;
    const canvasy2 = (this.canvas.height - this.offsety) / this.renderscale;
    const y1 = (lim1==null?canvasy1:Math.max(canvasy1, lim1))
    const y2 =(lim2==null?canvasy2:Math.min(canvasy2, lim2))

    if (y1 > y2) return;



    const x1 =  -y1/line.coef - line.move/line.coef;
    const x2 =  -y2/line.coef - line.move/line.coef;
    //console.log(y1)
    ctx.beginPath();
    ctx.moveTo(
        this.offsetx + x1 * this.renderscale,
        this.offsety + y1 * this.renderscale
    );
    ctx.lineTo(
        this.offsetx + x2 * this.renderscale,
        this.offsety + y2 * this.renderscale
    );

    ctx.stroke();
    //console.log(1)
}

renderlines(){
  const context = this.canvas.getContext('2d');
  //console.log(this.fig.arrup.linearr)
for(let i=0;i<this.fig.arrup.linearr.length;i++){
            context.strokeStyle = "blue";
        context.lineWidth = 2;
    this.drawline(this.fig.arrup.linearr[i].rotated(),this.fig.arrup.secup[i],this.fig.arrup.secup[i+1])//
}
for(let i=0;i<this.fig.arrdown.linearr.length;i++){
            context.strokeStyle = "yellow";
        context.lineWidth = 2;
    this.drawline(this.fig.arrdown.linearr[i].rotated(),this.fig.arrdown.secup[i],this.fig.arrdown.secup[i+1])//
}
};
renderbreakpoints(){
    const context = this.canvas.getContext('2d');
    for(let br of this.fig.arrup.secup){
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.beginPath()
    context.moveTo(0,br*this.renderscale+this.offsety)
    context.lineTo(this.canvas.height,br*this.renderscale+this.offsety)
    context.stroke();
    }
    for(let br of this.fig.arrdown.secup){
    context.strokeStyle = "green";
    context.lineWidth = 1;
    context.beginPath()
    context.moveTo(0,br*this.renderscale+this.offsety)
    context.lineTo(this.canvas.height,br*this.renderscale+this.offsety)
    context.stroke();
    }
}

figtocanvas(figlines){
    this.fig=new Fig;
    for(let line in figlines){
        this.fig.addlinef(line);
    }
    this.figtocanvas()
}

figtocanvas(){
    //console.log(3)
    let step=1/this.renderscale;
    const context = this.canvas.getContext('2d');
    const imageData =context.createImageData(this.canvas.height,this.canvas.width)
    let dis2=imageData.data;
    //console.log(4)
    let ittup=0
    let ittdown=0
    let ibase=parseInt(Math.max(0,(this.fig.intersectup*this.renderscale+this.offsety)))
    let currenti=-(this.offsety-ibase)/this.renderscale
    let track=ibase*this.canvas.height*4;
    //console.log(currenti*this.canvas.height*4)
    //console.log(this.fig.intersectup*this.renderscale+this.offsety)
    //console.log(5)
    //console.log(ibase)
    //console.log(this.fig.intersectdown*this.renderscale+this.offsety)
    for(let i=ibase;i<Math.min(this.canvas.height,this.fig.intersectdown*this.renderscale+this.offsety);i++){
         //console.log(5.5)
        while(this.fig.arrup.secup[ittup+1]<currenti){
            ittup++
        }
        while(this.fig.arrdown.secup[ittdown+1]<currenti){
            ittdown++
        }
        //console.log(this.fig.arrdown.linearr[ittdown])
        //console.log(ittdown)
        let startj=Math.max(0,parseInt(this.fig.arrdown.linearr[ittdown].funct(currenti)*this.renderscale)+this.offsetx)
        //console.log(startj)
        let endj=Math.min(this.canvas.width,parseInt(this.fig.arrup.linearr[ittup].funct(currenti)*this.renderscale)+this.offsetx)
        //console.log(endj)
        track+=startj*4
        if(startj<endj){
        for(let j=startj;j<endj;j++){
            dis2[track]=(0x00)
            track++;
            dis2[track]=(0xFF)
            track++;
            dis2[track]=(0x00)
            track++;
            dis2[track]=(0xFF)
            track++;
        }
        track+=(this.canvas.width-endj)*4;
        }else{
            track+=this.canvas.width*4;
        }
        currenti+=step;
    }
    context.putImageData(imageData, 0,0)
}
/*loop(int) {
    requestAnimationFrame(() => {
        this.renderlines(int);
        if(int<99){
            this.loop(int + 1);
        }else{
            console.timeEnd('Second');
        }
    });
}*/

}




    