
const c=document.getElementById('orb'),x=c.getContext('2d');let t=0,energy=.35,mode='calm';
function fit(){const r=c.getBoundingClientRect();c.width=r.width*devicePixelRatio;c.height=r.height*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
addEventListener('resize',fit);fit();
const modes={calm:{hue:165,speed:.006,ring:38},focus:{hue:275,speed:.014,ring:58},surge:{hue:15,speed:.028,ring:82}};
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;document.querySelectorAll('[data-mode]').forEach(z=>z.classList.remove('active'));b.classList.add('active')});
document.querySelectorAll('[data-mode]')[0].classList.add('active');
function loop(){const m=modes[mode];t+=m.speed;energy+=((mode==='surge'?.85:mode==='focus'?.58:.35)-energy)*.03;const w=c.clientWidth,h=c.clientHeight,cx=w/2,cy=h/2,R=Math.min(w,h)*.22;
x.fillStyle='rgba(5,6,11,.16)';x.fillRect(0,0,w,h);
for(let i=0;i<5;i++){const rr=R*(1+i*.22)+Math.sin(t*2+i)*8;x.beginPath();x.arc(cx,cy,rr,0,7);x.strokeStyle=`hsla(${m.hue+i*18},85%,65%,${.14-i*.02})`;x.lineWidth=1.2;x.stroke()}
for(let i=0;i<110;i++){const a=t*1.6+i*.16,r=R+Math.sin(t*3+i*.4)*m.ring*energy;const px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;x.beginPath();x.arc(px,py,1.3+Math.sin(t+i)*.8,0,7);x.fillStyle=`hsla(${m.hue+i},90%,68%,${.35+energy*.4})`;x.fill()}
const g=x.createRadialGradient(cx,cy,0,cx,cy,R*1.5);g.addColorStop(0,`hsla(${m.hue},90%,70%,${.22+energy*.3})`);g.addColorStop(1,'transparent');x.fillStyle=g;x.beginPath();x.arc(cx,cy,R*1.5,0,7);x.fill();
x.beginPath();x.arc(cx,cy,R*.62,0,7);x.fillStyle='rgba(6,8,16,.9)';x.fill();x.strokeStyle=`hsla(${m.hue},90%,72%,.9)`;x.lineWidth=2;x.stroke();
requestAnimationFrame(loop)}loop();
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth'})}));
