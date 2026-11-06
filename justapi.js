




    class Line{
        constructor(coef,move){
            this.coef=parseFloat(coef);
            this.move=parseFloat(move);
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
            var x=(-this.move+line.move)/co;
            return [x,(x*this.coef+this.move)]
            }else{
                console.log("ERRROR PARALELING LINES")
            }
        }
        intersectionx(line){
            let co=(this.coef-line.coef);
            if(co){
            var x=(-this.move+line.move)/co;
            return x
            }else{
                console.log("ERRROR PARALELING LINES")
            }
        }
        intersectiony(line){
            let co=(this.coef-line.coef);
            if(co){
            var x=(-this.move+line.move)/co;
            return x*this.coef+this.move
            }else{
                console.log("ERRROR PARALELING LINES")
            }
        }
        rotated(){
            return new Line(-1/this.coef,this.move/this.coef)
        }
        strprint(){
            return `coef: ${this.coef}\nmove: ${this.move} \n`
        }
    };

    class Secarr{
        constructor(b=false){
            this.linearr=[];
            this.secup=[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER];
            this.b=b;
        }


        findcross(line){
            var i=0
            if(line.coef>this.linearr[i].coef && line.intersectionx(this.linearr[i])>this.secup[i]){return -1}
            if(line.coef==this.linearr[i].coef && line.move<this.linearr[i].move){
                return -1
            }
            while(i<this.linearr.length && line.coef<this.linearr[i].coef){
                        console.log("e3")
                        //main checker
                        if (line.intersectionx(this.linearr[i])<=this.secup[i+1]){
                            return i;
                        }
                        console.log("e6")
                        i++
                }
                return -2
        }


        findcrossrev(line){
            var i=this.linearr.length-1
            if(line.coef>this.linearr[i].coef && line.intersectionx(this.linearr[i])>this.secup[i]){return this.linearr.length}
            if(line.coef==this.linearr[i].coef && line.move>this.linearr[i].move){
                return this.linearr.length
            }
            while(i>=0 && line.coef<this.linearr[i].coef){
                        console.log("e3")
                        //main checker
                        if (line.intersectionx(this.linearr[i])<=this.secup[i+1]){
                            return i;
                        }
                        console.log("e6")
                        i--
                }
                return -2
        }
        
        
        findcrossalt(line){
            var i=0
            if(line.coef<this.linearr[i].coef && line.intersectionx(this.linearr[i])<this.secup[i+1]){return -1}
            if(line.coef==this.linearr[i].coef && line.move<this.linearr[i].move){
                return -1
            }
            while(i<this.linearr.length && line.coef>this.linearr[i].coef){
                        console.log("e3")
                        //main checker
                        if (line.intersectionx(this.linearr[i])>=this.secup[i]){
                            return i;
                        }
                        console.log("e6")
                        i++
                }
                return -2
        }


        findcrossrevalt(line){
            var i=this.linearr.length-1
            if(line.coef<this.linearr[i].coef && line.intersectionx(this.linearr[i])<this.secup[i+1]){return this.linearr.length}
            if(line.coef==this.linearr[i].coef && line.move<this.linearr[i].move){
                return this.linearr.length
            }
            while(i>=0 && line.coef>this.linearr[i].coef){
                        console.log("e3")
                        //main checker
                        if (line.intersectionx(this.linearr[i])>=this.secup[i]){
                            return i;
                        }
                        console.log("e6")
                        i--
                }
                return -2
        }


        addline(line){
            var ret=1;
            if(this.linearr.length==0){
                this.linearr[0]=line;
                console.log("d1")
                return ret
            }
            var p1
            var p2
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
            console.log(!counter)
            
            var inter1;
            var inter2;
            if(p1!=-1){
                inter1=line.intersectionx(this.linearr[p1]);
            }else{
                inter1=Number.MIN_SAFE_INTEGER
                ret=2
            }
            if(p2!=this.linearr.length){
                inter2=line.intersectionx(this.linearr[p2]);
                
            }else{
                inter2=Number.MAX_SAFE_INTEGER
                ret=3
            }
            this.secup.splice(p1+1,counter+1,inter1,inter2)
            this.linearr.splice(p1+1,counter,line)
            return ret;
        }

        strprint(){
            var a= `sec:${this.secup[0]}\n\n`
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
        constructor(){
            this.arrup=new Secarr();
            this.arrdown=new Secarr(true);
        }
        addlinef(line){
            if(line.move>0){
                switch(this.arrup.addline(line)){
                    case 0:
                        return;
                    case 1:
                        return;
                    case 2:
                        if(this.arrdown.linearr.length!=0){
                            var index=this.arrdown.findcrossrev(line)
                        console.log(index)
                            switch(index){
                                case -1:
                                    console.log("FINDCROSS ERROR invalid value to late 2")
                                    break;
                                case this.arrdown.linearr.length:
                                    console.log("FINDCROSS ERROR invalid value to early 2")
                                    break;
                                default:
                                    this.arrdown.secup.splice(index,this.arrdown.linearr.length-index+1,line.intersectionx(this.arrup.linearr[index]))
                                    break;
                                case -2:
                                    console.log("FINDCROSS ERROR error 2")
                                    break;
                            }
                        }
                        break;
                    case 3:
                        if(this.arrdown.linearr.length!=0){
                            var index=this.arrdown.findcrossalt(line)
                        console.log(index)
                            switch(index){
                                case -1:
                                    console.log("FINDCROSS ERROR invalid value to early 3")
                                    break;
                                case this.arrdown.linearr.length:
                                    console.log("FINDCROSS ERROR invalid value to late 3")
                                    break;
                                default:
                                    this.arrdown.secup.splice(0,index+1,line.intersectionx(this.arrup.linearr[index]))
                                    break;
                                case -2:
                                    console.log("FINDCROSS ERROR error 3")
                                    break;
                            }
                        }
                        break;
                }
            }else if(line.move<0){
                switch(this.arrdown.addline(line)){
                    case 0:
                        return;
                    case 1:
                        return;
                    case 2:
                        if(this.arrup.length!=0){
                        console.log(this.arrup.findcross(line))
                        }
                        break;
                    case 3:
                        if(this.arrup.length!=0){
                        console.log(this.arrup.findcrossrevalt(line))
                        }
                        break;
                }
            }else{
                console.log(`move 0 ERROR`)
            }


        }
        strprint(){
            var a="ARRUP:\n\n"
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
    constructor(canvas,fig=new Fig,renderscale=1,offsetx=canvas.width/2,offsety=canvas.height/2){
        this.canvas=canvas
        this.renderscale=renderscale
        this.offsetx=offsetx;
        this.offsety=offsety;
        this.fig=fig
    }

drawline(line,lim1,lim2){
    const ctx = this.canvas.getContext('2d');
    const canvasx1 = -this.offsetx / this.renderscale;
    const canvasx2 = (this.canvas.width - this.offsetx) / this.renderscale;
    const x1 = Math.max(
        canvasx1,
        lim1 ?? -Infinity
    );

    const x2 = Math.min(
        canvasx2,
        lim2 ?? Infinity
    );

    if (x1 > x2) return;



    const y1 = line.coef * x1 + line.move;
    const y2 = line.coef * x2 + line.move;
    console.log(y1)
    ctx.beginPath();
    ctx.moveTo(
        this.offsetx + x1 * this.renderscale,
        this.offsety - y1 * this.renderscale
    );
    ctx.lineTo(
        this.offsetx + x2 * this.renderscale,
        this.offsety - y2 * this.renderscale
    );

    ctx.stroke();
    console.log(1)
}

renderlines(){
  const context = this.canvas.getContext('2d');
  //console.log(this.fig.arrup.linearr)
for(let i=0;i<this.fig.arrup.linearr.length;i++){
            context.strokeStyle = "blue";
        context.lineWidth = 2;
    this.drawline(this.fig.arrup.linearr[i].rotated(),)//this.fig.arrup.secup[i],this.fig.arrup.secup[i+1]
}
for(let i=0;i<this.fig.arrdown.linearr.length;i++){
            context.strokeStyle = "blue";
        context.lineWidth = 2;
    this.drawline(this.fig.arrdown.linearr[i].rotated(),)//this.fig.arrdown.secup[i],this.fig.arrdown.secup[i+1]
}
};
renderbreakpoints(){
    const context = this.canvas.getContext('2d');
    for(let br of this.fig.arrup.secup){
    context.strokeStyle = "red";
    context.lineWidth = 1;
    this.drawline(new Line(0,-br))
    }
    for(let br of this.fig.arrdown.secup){
    context.strokeStyle = "red";
    context.lineWidth = 1;
    this.drawline(new Line(0,-br))
    }
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




    