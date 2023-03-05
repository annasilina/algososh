import React, {ChangeEvent, FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./fibonacci.module.css"
import {delay} from "../../utils/delay";

export const FibonacciPage: React.FC = () => {
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [value, setValue] = useState<number | ''>('');
  const [arrResult, setArrResult] = useState<number[]>([]);

  const handlerFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    const form = evt.target as HTMLFormElement;
    evt.preventDefault();
    setIsCalculating(true);
    if (value) {
      fibCalculate(value).then(() => {
        form.reset();
        setValue('');
      });
    }
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
      await delay(500);
      setArrResult([...arr]);
      for (let i = 2; i < value + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
        await delay(500);
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
          placeholder='Введите число'
          type='number'
          max={19}
          isLimitText={true}
          onChange={handlerInputChange}
          extraClass={styles.formInput}
          disabled={isCalculating}
        />
        <Button
          text={'Раcсчитать'}
          type='submit'
          disabled={value < 0 || value > 19 || value === ''}
          isLoader={isCalculating}
          extraClass={styles.btn}
        >
        </Button>
      </form>
        <section className={`${styles.circles}`}>
          {arrResult.map((item, index) => (
            <Circle
              key={index}
              letter={String(item)}
              tail={String(index)}
            />
          ))}
        </section>
      </section>
    </SolutionLayout>
  );
};
