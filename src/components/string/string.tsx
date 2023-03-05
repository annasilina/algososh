import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./string.module.css";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {swap} from "../../utils/swap";

export const StringComponent: React.FC = () => {
  const [originalString, setOriginalString] = useState<string>('');
  const [arrFromString, setArrFromString] = useState<string[]>([]);
  const [sortedIndexes, setSortedIndexes] = useState<number[]>([]);
  const [nextIndexes, setNextIndexes] = useState<number[]>([]);
  const [isReversing, setIsReversing] = useState<boolean>(false);

  const handlerFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    const form = evt.target as HTMLFormElement;
    evt.preventDefault();
    setIsReversing(true);
    setSortedIndexes([]);
    setNextIndexes([]);
    setArrFromString(originalString.split(''));
    reversString(originalString).then(() => {
      form.reset();
      setOriginalString('');
    });
  }

  const handlerInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setOriginalString(evt.target.value);
  }

  const reversString = async (originalString: string) => {
    let reversedArr = originalString.split('');
    let sorted: number[] = [];
    let start = 0;
    let end = reversedArr.length - 1;
    while (start <= end) {
      setNextIndexes([start, end]);
      await delay(800);
      swap(reversedArr, start, end);
      setArrFromString(reversedArr);
      sorted.push(start, end);
      setSortedIndexes(sorted);
      start++;
      end--;
    }
    setIsReversing(false)
  }

  return (
    <SolutionLayout title="Строка">
      <form className={`${styles.form}`} onSubmit={handlerFormSubmit}>
        <Input
          placeholder='Введите текст'
          maxLength={11}
          isLimitText={true}
          extraClass={styles.formInput}
          onChange={handlerInputChange}
          disabled={isReversing}
        />
        <Button
          text='Развернуть'
          type='submit'
          disabled={originalString === ''}
          isLoader={isReversing}
          extraClass={styles.btn}
        >
        </Button>
      </form>
      <section className={`${styles.circles}`}>
        {arrFromString.map((item, index) => (
          <Circle
            key={index}
            letter={item}
            state={
              sortedIndexes.includes(index)
                ? ElementStates.Modified
                : nextIndexes.includes(index)
                  ? ElementStates.Changing
                  : ElementStates.Default
            }
          />
        ))}
      </section>

    </SolutionLayout>
  );
};
