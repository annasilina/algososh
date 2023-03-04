import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import styles from "./string.module.css";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
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
    evt.preventDefault();
    setIsReversing(true);
    const form = evt.target as HTMLFormElement;
    form.reset();
    setSortedIndexes([]);
    setNextIndexes([]);
    setArrFromString(originalString.split(''));
    reversString(originalString).then();
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
      await delay(1000);
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
          extraClass={styles.input}
          onChange={handlerInputChange}
        />
        <Button
          text='Развернуть'
          type='submit'
          disabled={isReversing}
        >
        </Button>
      </form>
      <section className={`${styles.circles}`}>
        {arrFromString.map((item, index) => (
          <Circle
            letter={item}
            key={index}
            extraClass={styles.circle}
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
