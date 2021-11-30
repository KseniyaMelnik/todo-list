import {ActionType, calculator} from "./reducer";




test("sum of calculator", ()=>{
    // 1.Тестовые данные
    const num1 = 10
    const num2 = 12

    //2.Выполнение тестируемого кода
    const action: ActionType = {type: "SUM", number: num2}
    const result = calculator(num1, action)

    //3. Сравнение с ожидаемым результатом
    expect(result).toBe(22)
})

test("mult of calculator", ()=>{
    // 1.Тестовые данные
    const num1 = 10
    const num2 = 12

    //2.Выполнение тестируемого кода
    const action: ActionType = {type: "MULT", number: num2}
    const result = calculator(num1, action)

    //3. Сравнение с ожидаемым результатом
    expect(result).toBe(120)
})

test("subscribe of calculator", ()=>{
    // 1.Тестовые данные
    const num1 = 10
    const num2 = 12

    //2.Выполнение тестируемого кода
    const action: ActionType = {type: "SUB", number: num2}
    const result = calculator(num1, action)

    //3. Сравнение с ожидаемым результатом
    expect(result).toBe(-2)
})

test("divide of calculator", ()=>{
    // 1.Тестовые данные
    const num1 = 12
    const num2 = 10

    //2.Выполнение тестируемого кода
    const action: ActionType = {type: "DIV", number: num2}

    //3. Сравнение с ожидаемым результатом
    expect(calculator(num1, action)).toBe(1.2)
})