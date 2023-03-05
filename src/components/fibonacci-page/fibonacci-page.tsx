import React, {ChangeEvent, FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils/delay";

export const FibonacciPage: React.FC = () => {
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [arrResult, setArrResult] = useState<number[]>([]);

  const handlerFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    const form = evt.target as HTMLFormElement;
    evt.preventDefault();
    setIsCalculating(true);
    fibCalculate(value).then(() => form.reset());
  }

  const handlerInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(evt.target.value));
  }

  const fibCalculate = async (value: number) => {
    let arr: number[] = [0, 1];
    if (value === 0) {
      setArrResult([0]);
      setIsCalculating(false);
    } else {
      setArrResult([0]);
      await delay(1000);
      setArrResult([...arr]);
      for (let i = 2; i < value + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
        await delay(1000);
        setArrResult([...arr]);
      }
      setIsCalculating(false);
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={styles.container}>
        <form className={`${styles.form}`} onSubmit={handlerFormSubmit}>
        <Input
          placeholder='Введите текст'
          type='number'
          max={19}
          isLimitText={true}
          onChange={handlerInputChange}
          extraClass={styles.input}
          disabled={isCalculating}
        />
        <Button
          text={'Раcсчитать'}
          type='submit'
          disabled={isCalculating || value < 0 || value > 19 }
          isLoader={isCalculating}
          extraClass={styles.button}
        >
        </Button>
      </form>
        <section className={`${styles.circles}`}>
          {arrResult.map((item, index) => (
            <Circle
              letter={String(item)}
              key={index}
              extraClass={styles.circle}
              tail={String(index)}
            />
          ))}
        </section>
      </section>
    </SolutionLayout>
  );
};
