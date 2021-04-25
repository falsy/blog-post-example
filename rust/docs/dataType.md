# 프로젝트의 시작 함수
```
fn main() {
  ...
}
```

# 선언
  - 상수 const
  - 변수 let
  - 불변 변수 let
  - 가변 변수 let mut 

```
let x = 5;
x = 1;
println!("{}", x);
// error
```

```
let mut x = 5;
x = 1;
println!("{}", x);
// 1
```

## 변수 선언에서 자바스크립트와 다른 점
```
let x = 5;
let x = x + 1;
println!("x : {}", x);
// 12
```
재선언 가능 이를 러스트에서는 shadowing 이라고 칭함  
두번째 x는 이전 변수를 shodows 함  
첫번재 x는 두번째 x에 의해 shadowed 됨  

## let mut 와 shadowing 차이점
  - 형 변환

만약 "   " 의 공백 개수를 확인하는 코드를 작성한다고 했을 때
  - let mut
```
let mut spaces = "   ";
spaces = spces.len();
// error
// 변수의 유형이 변경되어 오류
```

  - let (shadowing 하지 않음)
```
  let space_str = "   ";
  let space_num = space_str.len();
```

  - let (shadowing)
```
  let space = "   ";
  let space = space.leng();
```

# 데이터 타입
  - 스칼라 : 정수형, 부동소수점 숫자, boolean, 문자
  - 컴파운드 : 튜플, 배열

## 스칼라
### 정수형
length       |       Signed       |      UnSigned
8-bit                i8                  u8
16-bit               i16                 u16
32-bit               i32                 u32
64-bit               i64                 u64
arch                 isize               usize

( i8 = -128 에서 127 까지의 값 ) -(2n - 1) ~ 2n - 1 - 1 // n-1은 지수  
( u8 = 0 에서 255 까지의 값 ) 0 ~ 2n - 1 // n은 지수  
isize와 usize는 프로그램이 동작하는 컴퓨터 환경에 따라 결정됨  

// Rust 기본값은 i32이며 확실하게 정해지지 않은 경우라면 일반적으로 많이 사용하고 빠름

### 부동 소수점
  - f32
  - f64
각각 32bit, 64bit의 크기를 갖고 기본 타입은 f64 - 이유는 최신 CPU 상에서 f32와 비슷한 속도를 내며 더 정밀한 표현이 가능
예제
```
  let x = 2.0 // f64
  let y: f32 = 3.0 // f32
```
부동 소수점 숫자는 IEEE-754 표준에 따라 표현됩니다.
// 자바스크립트 IEEE-754(64bit format)의 표준을 따른다고 본 기억이 있는데요
// Rust도 '0.3 - 0.1' 은 기대와 다른 값을 응답해줍니다.
```
let x = 0.3 - 0.1;
println!("{}", x);
// 0.19999999999999998
```

### 기본적인 수학적 연산은 동일

### Boolean 타입
```
let t = true;
let f: bool = false;
```

### 문자 타입(char)
char 타입은 unicode scalar를 표현하는 값이고 이는 ASCII 보다 많은 표현을 가능하게함.
char 타입의 범위는 U+0000 ~ U+D7FF 그리고 U+E000 ~ U+10FFFF 를 포괄함.
(하지만 문자는 unicode를 위한 개념이 아니기 때문에 인간적 직관에 따른 문자와 동일하지 않을 수 있음)

## 컴파운드(복합 타입)

### 튜플
- 선언  
```
let tup: (i32, f64, u8) = (500, 6.4, 1);
```
- 구조해체 사용
```
let (x, y, z) = tup;
```
- 색인 접근 사용
```
let x_value = tup.0;
let y_value = tup.1;
let z_value = tup.2;
```

### 배열
Rust의 배열은 튜플과 다르게 배열의 모든 값은 같은 타입이여야 함.
그리고 자바스크립트의 배열과 다르게 Rust의 배열은 고정된 길이를 갖음.  

- 선언
```
let array = [1, 2, 3, 4, 5];
```

- 색인 접근 사용
```
let first = array[0];
// 1
```

 - 유효하지 않은 접근
```
let array = [1, 2, 3, 4, 5];
let index = 10;
let element = a[index];

println!("{}", element);
```
위와 같은 코드는 빌드는 이루어 지지만 실행시 에러가 발생합니다.  
이것은 Rust의 안전 원칙이 동작하는 첫번째 예라고 합니다. 많은 저수준의 언어는 이러한 타입 검사는 수행하지 않으며 잘못된 색인을 제공하면 유효하지 않은 메모리에 액세스 할 수 있습니다. Rust는 메모리 접근은 허용하고 계속 진행하는 대신 즉시 종료하여 이러한 종류의 오류로부터 사용자를 보호합니다.












