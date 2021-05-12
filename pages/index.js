import React from 'react'
import * as R from 'ramda'

export default function index() {
  const summaryPrice = 5000;
  let textPayPerMonth = ''
  const text = '2'
  const numberPrice = Number(text)
  if (numberPrice && numberPrice > 1) {
    const payPerMonth = Math.ceil(summaryPrice / numberPrice);
    textPayPerMonth = `ผ่อน ${payPerMonth} บาท ต่อเดือน`
  } else {
    textPayPerMonth = ''
  }

  const pureFunction = (x) => {
    return 2 * x - 1
  }
  
  const impureFunction = (x) => {
    return init += 2 * x - 1
  }
  let init = 2

  const number = [1, 2, 3, 4, 5]
  let numberImperativeTopureFunction = []
  for (let i = 0; i < number.length; i++) {
    numberImperativeTopureFunction[i] = number[i] * 2;
  }

  const sq = number.map(n => n * 2);

  const number2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const pang = number2.map(n => n * 2).filter(n => n >= 10)

  // function upperCase 
  const upperCase = (o) => o.map(_o => ({ book: R.toUpper(_o.book) }))
  const payload = '[{"book":"js"},{"book":"lamda"}]'
  const pipeline = R.pipe(JSON.parse, upperCase, console.log)
  pipeline(payload)
  const compose = R.compose(console.log, upperCase, JSON.parse)
  compose(payload)

  const add = (x, y) => x + y

  function addOneParameter(x) {
    return function(y) {
      return x + y
    }
  }

  const a = x => y => z => x + y * z
  const findX = a(2)
  const findXY = findX(4)
  const findXYZ = findXY(6)
  

  const h = (x, y, z) => x + y * z
  

  const addOne = addOneParameter(1)

  //R.curry
  const b = (x, y, z) => x + y * z
  const withCurry = R.curry(b)

  const FindX = withCurry(1)
  const FindXY = FindX(3)
  const FindXYZ = FindXY(6)

  console.log('FindXYZ =', FindXYZ)

  //partialApplied

  const partialApplied = (
    fn, 
    ...args
  ) => (
    ..._args
  ) => fn.apply(
    null, [...args, ..._args]
  )

  const takeAllAtOnce = partialApplied(h, 1, 2, 3);
  takeAllAtOnce()

  const takeOnlyFn = partialApplied(h)
  
  const somePreDefineNumber = partialApplied(h, 1);

  //R.partial

  const RtakeAllAtOnce = R.partial(h, [2,3,4]);
  const RtakeOnlyFn = R.partial(h);
  const RtakeSomeOnDefine = R.partial(h, [2]);
  const takeMore3AtOnce = R.partial(h)

  // Point-free Programming
  const pointPayload = '123456'
  const _split = R.split('')
  const _toNumber = (x) => Number(x)
  const _toStr = (x) => String(x)
  const _eachToNumber = (x) => x.map(_toNumber)
  const _product = (x) => R.product(x) //คูณ ตัวเลขทั้งหมด
  const _findEven = (x) => x.filter(n => n % 2 === 0)
  const _concat = (x) => R.join('', x)

  const findEvenFromProductResult = R.pipe(
    _split,        // ['1','2','3','4','5','6']
    _eachToNumber, // [1,2,3,4,5,6]
    _product,      // 720
    _toStr,        // '720'
    _split,        // ['7','2','0']
    _eachToNumber, // [7,2,0]
    _findEven,     // [2,0]
    _concat,       // 20
    _toStr,        // '20'
  )
  const result = findEvenFromProductResult(pointPayload)
  console.log(result)

  // ใช้ Object.freeze เพื่อไม่ให้ object ถูกแก้ properties ได้
  const obj = Object.freeze({ name : "John" });
  // obj.name = 'Jame' //error
  const Mr = (obj) => ({ ...obj, prefix: 'Mr'})
  const objSpread = { fname : 'Pakornpong', lname: 'Hirunjaraspiwat', prefix: '' }
  const withPrefix = Mr({ ...objSpread })
  console.log('withPrefix =', withPrefix)

  const Mrs = (obj) => ({...obj, prefix: 'Mr' })
  const objs = { 
  fname: 'John', 
  lname: 'Doe', prefix: '', 
  address: { hometown: '', city: '' },
}
const newObj = JSON.parse(JSON.stringify(objs))
const withPrefixs = Mrs(newObj)
console.log('withPrefixs = ', withPrefixs)
  return (
    <div>
      <h1>Hello</h1>
      <h2>{textPayPerMonth}</h2>
      <>
        <h3>Pure function</h3>
        <h4>{pureFunction(4)}</h4>
        <h3>Impure function</h3>
        <h4>{impureFunction(2)}</h4>
        <h4>{impureFunction(2)}</h4>
        <h4>{impureFunction(2)}</h4>
        <h3>Imperative (จำเป็น)</h3>
        <h4>{numberImperativeTopureFunction} หรือ [2, 4, 6, 8, 10]</h4>
        <h3>Declarative</h3>
        <h4>{sq}</h4>
        <h3>Composition</h3>
        <h4>{pang}</h4>
        <h2>{takeAllAtOnce()}</h2>
        <h3>{takeOnlyFn(1,2,3)}</h3>
        <h2>{somePreDefineNumber(2,3)}</h2>
        <h3>{takeOnlyFn(1,2,3,4,5,6,[1,2])}</h3>
        <h2>{RtakeAllAtOnce()}</h2>
        <h4>{RtakeOnlyFn([2,4,5])()} = จำเป็นต้องใส่ () เพื่อบอกเป็นฟังชัน</h4>
        <h2>{RtakeSomeOnDefine(5,6)} check</h2>
        <h1>{takeMore3AtOnce([1, 2, 3, 4, 5, 6, 7, 8, 9, [1,2,4], 'test'])()}</h1>
      </>
    </div>
  )
}
