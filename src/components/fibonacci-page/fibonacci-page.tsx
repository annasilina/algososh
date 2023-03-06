import React, {ChangeEvent, FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./fibonacci.module.css"
import {delay} from "../../utils/delay";
import {fibCalculate} from "../../utils/fibCalculate";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [arrResult, setArrResult] = useState<number[]>([]);

  const handlerFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsCalculating(true);
    fibVisualization(value)
      .then(() => {
        setIsCalculating(false)
      })
  }

  const handlerInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  }

  const fibVisualization = async (value: string) => {
    const valueNumber = Number(value);
    if (valueNumber === 0) {
      setArrResult([0]);
      setIsCalculating(false);
    } else {
      const elements = fibCalculate(valueNumber);
      for (let i = 0; i < elements.length; i++) {
        await delay(SHORT_DELAY_IN_MS);
        setArrResult(elements.slice(0, i + 1));
      }
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
            disabled={Number(value) < 0 || Number(value) > 19 || value === ''}
            isLoader={isCalculating}
            extraClass={styles.btn}
          >
          </Button>
      </form>
        <ul className={`${styles.circles}`}>
          {arrResult.map((item, index) => (
            <li key={index}>
              <Circle
                letter={String(item)} tail={String(index)}
              />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
