import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./stack.module.css";
import {Circle} from "../ui/circle/circle";
import {TOP} from "../../constants/element-captions";
import {Stack} from "./Stack";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {clearInput} from "../../utils/clearInput";

type TStackItem = {
  value: string,
  state: ElementStates
}

export const StackPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('')
  const [stackArray, setStackArray] = useState<TStackItem[]>([]);
  const [adding, setAdding] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [clearing, setClearing] = useState<boolean>(false);
  const [stack] = useState(new Stack<TStackItem>());

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }

  const handleAddButton = async () => {
    setIsLoading(true);
    setAdding(true);
    stack.push({value: inputValue, state: ElementStates.Changing});
    setStackArray([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    if (stack.peak) {
      stack.peak.state = ElementStates.Default;
    }
    setStackArray([...stack.getElements()]);
  }

  const handleDeleteButton = async () => {
    setIsLoading(true);
    setDeleting(true);
    if (stack.peak) {
      stack.peak.state = ElementStates.Changing;
    }
    setStackArray([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArray([...stack.getElements()]);
  }

  const handleClearButton = async () => {
    setIsLoading(true);
    setClearing(true);
    await delay(SHORT_DELAY_IN_MS);
    stack.clear();
    setStackArray([...stack.getElements()]);
  }

  return (
    <SolutionLayout title='Стек'>
      <section className={styles.container}>
        <div className={styles.inputContainer}>
          <Input
            placeholder='Введите символы'
            value={inputValue}
            type='text'
            maxLength={4}
            isLimitText={true}
            extraClass={styles.input}
            disabled={isLoading}
            onChange={handleInputChange}
            id='input'
          />
          <Button
            text='Добавить'
            extraClass={styles.btn}
            disabled={isLoading || inputValue === ''}
            isLoader={adding}
            type='button'
            onClick={() =>
              handleAddButton()
                .then(() => {
                  setIsLoading(false);
                  setAdding(false)
                  clearInput('input', setInputValue);
                })}
          ></Button>
          <Button
            text='Удалить'
            extraClass={styles.btn}
            disabled={isLoading || !stackArray.length}
            isLoader={deleting}
            type='button'
            onClick={() =>
              handleDeleteButton()
                .then(() => {
                  setIsLoading(false);
                  setDeleting(false);
                })}
          ></Button>
        </div>
        <Button
          text='Очистить'
          extraClass={styles.btn}
          disabled={isLoading || !stackArray.length}
          isLoader={clearing}
          type='button'
          onClick={() => {
            handleClearButton()
              .then(() => {
                setIsLoading(false);
                setClearing(false);
              })
          }}
        ></Button>
      </section>
      <ul className={styles.circles}>
        {stackArray && stackArray.map((element, index) => (
          <li key={index}>
            <Circle
              letter={element.value}
              head={index === stackArray.length - 1 ? TOP : undefined}
              index={index}
              state={element.state}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
