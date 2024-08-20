import Matter from 'matter-js';

// 윈도우(브라우저)의 크기를 변수에 담습니다.
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

// Matter-js
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
// 이 밖에도
// console.log(Matter); 를 찍어보면 알 수 있듯이
// Composite, Constraint, Mouse ... 등 많은 기능들이 있습니다.
// 이 부분은 다음 글에서 천천히 추가적으로 정리해보려 합니다.

// 엔진을 생성합니다.
const engine = Engine.create();
const world = engine.world;
engine.world.gravity.y = 0.1;
// engine.world.gravity 는 중력?? 이라고 해야하나 y축으로 떨어지는 속도를 정합니다.
// 0 보다 작으면 오브제들이 위로 올라갑니다.
// engine.world.gravity.x 속성도 있어서 오른쪽 또는 왼쪽으로 쏠리게 할 수도 있습니다.

// Bodies에서 오브제를 만듭니다.
// 이름 그대로 circle은 원, rectangle은 사각형을 만듭니다.
// 자세한 정보는 공식 홈페이지를 참고하는게 더 좋을 것 같지만
// Bodies.circle(x축 위치값, y축 위치값, 반지름값, 옵션);
// Bodies.rectangle(x축 위치값, y축 위치값, 너비값, 높이값, 옵션);
// 입니다.
const circle = Bodies.circle(windowWidth/2, 50, 10, {
        friction: 0.2,
        // 단어 그대로 마찰력 값입니다. (0~1)
        restitution: 0.8,
        // 단어 그대로 복원력 입니다. (0~1)
        render: {
          fillStyle: '#000',
          strokeStyle: '#000',
          lineWidth: 1
        }
        // fillStyle 은 채워질 색, strokeStyle은 선색, lineWidth 선 굵기
      });
const ground = Bodies.rectangle(windowWidth/2, windowHeight-50, windowWidth/3, 10, {
        isStatic: true
        // 고정된 위치의 오브제
      });
// 이 밖에 options 값들이 어떤것들이 있는지 아직 다 잘 알지 못해서, 공부해서 추후에 자세히 추가하겠습니다.

// World에 위 오브제들을 추가합니다.
World.add(engine.world, [circle, ground]);

// 렌더를 생성합니다.
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: windowWidth,
      height: windowHeight,
      // 기본값은 wireFrames 값이 ture이고 false를 주지 않으면 위  Bodies.circle의 render 옵션이 적용되지 않습니다.
      wireframes: false,
      background: '#fff'
    }
});

// 엔진을 실행하고
Engine.run(engine);
// 렌더를 실행합니다.
Render.run(render);


// 몇가지 이벤트를 추가합니다.

// render 객체의 canvas는 DOM body에 추가 될 canvas 엘리먼트를 가리킵니다.
render.canvas.addEventListener("click", (e) => {
  // 캔버서를 마우스로 클릭하면
  // 현재 마우스 위치에 반지름이 10인 원을 만들어서
  const box = Bodies.circle(e.offsetX, e.offsetY, 10, {
    friction: 0.2,
    restitution: 0.8
  });
  // 공간에 추가합니다.
  World.add(engine.world, box);
}, false);

// 1초 간격으로
setInterval(() => {
  // 가로 중앙, 상단에서 50px 떨어진 곳에 반지름이 10인 원을 만들어서
  const box = Bodies.circle(windowWidth/2, 50, 10, {
    friction: 0.2,
    restitution: 0.8
  });
  // 공간에 추가합니다.
  World.add(engine.world, box);
}, 1000);

// 아까 위에 선언한 Matter에서 지정되어 있는 이벤트 인데요.
// 그중에 'collisionStart' 충돌의 시작한 시점의 이벤트입니다.
Events.on(engine, "collisionStart", (event) => {
  // 오브제들이 충돌하면 console.log를 출력합니다.
  console.log('collision');
});
// 첫번째 글이라 자세히 적진 않았지만 인자로 받은 event의 값으로
// 충돌한 오브제 A와 오브제 B를 구분하여 이벤트를 처리해 줄 수도 있습니다.



