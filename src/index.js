// let sum = function (a, b) {
//     return a + b
// }
// console.log(sum(1,3));
// import title from './title.txt'
// console.log(title, 'title')
import bg from './images/img.png?sizes[]=300,sizes[]=600,sizes[]=1024';
console.log(bg, ' bg.srcSet');
let image = new Image();

image.srcset = bg.srcSet;
image.sizes =  `(min-width: 1024) 1024px,100vw`
document.body.appendChild(image);