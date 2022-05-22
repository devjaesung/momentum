const images = ["0.jpg", "1.jpg", "2.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img"); 

bgImage.src = `img/${chosenImage}`;

//username이 등록되어 있을 때만 랜덤 이미지
if(savedUsername===null){
    document.body.style.background = 'black';

}else{
    document.body.style.background = `url(${bgImage.src})`;
}