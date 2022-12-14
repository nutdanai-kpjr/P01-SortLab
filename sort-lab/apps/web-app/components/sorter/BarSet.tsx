import Bar from './Bar';
import styles from '../../styles/components/sorters/BarSet.module.css';
import Image from 'next/image';

import { Slider } from '../selectors/Slider';
import Dropdown from '../selectors/Dropdown';
import { useEffect, useState } from 'react';

import { useSortVisualizer } from '../../hooks/sorter_implement';

export default function BarSet() {
  //this component manage the array of numbers that will be sorted
  const {
    play,
    getName,
    getDescription,
    getComplexity,
    getArray,
    getSpeed,
    getIsAudioOn,
    getIsShowExplainText,
    getExplainText,
    sortAlgorithms,
    currentSortAlgorithm,
    changeSortAlgorithm,
    changeSize,
    changeSpeed,
    stop,
    reset,
    toggleAudio,
    toggleExplainText,
  } = useSortVisualizer();
  const [hydrated, setHydrated] = useState(false);
  const leanMode = getArray().length > 50;
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <div>
      {/* <h1>{getArray().map((i) => i.value)}</h1> */}
      {/* <h2>{getName()}</h2> */}

      <div className={styles.barSet}>
        <div className={styles.settingBar}>
          <Dropdown
            list={sortAlgorithms.map((algo) => algo.info.name)}
            defaultValue={currentSortAlgorithm.info.name}
            onChange={changeSortAlgorithm}
          ></Dropdown>
          <div className={styles.buttonGroup}>
            <button
              data-cy={'play-button'}
              onClick={async () => {
                await play();
              }}
            >
              <Image
                alt="Play Button"
                width={40}
                height={50}
                src="/play-icon.svg"
              ></Image>
            </button>
            <button
              data-cy={'stop-button'}
              onClick={() => {
                stop();
              }}
            >
              <Image
                alt="Stop Button"
                width={40}
                height={50}
                src="/stop-icon.svg"
              ></Image>
            </button>
            <button
              data-cy={'reset-button'}
              onClick={() => {
                reset();
              }}
            >
              <Image
                alt="Reset Button"
                width={40}
                height={50}
                src="/shuffle-icon.svg"
              ></Image>
            </button>
            <button
              data-cy={'audio-button'}
              onClick={() => {
                toggleAudio();
              }}
            >
              <Image
                alt={getIsAudioOn() ? 'Audio On Button' : 'Audio Off Button'}
                width={40}
                height={50}
                src={
                  getIsAudioOn() ? '/audio-on-icon.svg' : '/audio-off-icon.svg'
                }
              ></Image>
            </button>
            <button
              data-cy={'explain-button'}
              onClick={() => {
                toggleExplainText();
              }}
            >
              <Image
                alt={
                  getIsShowExplainText()
                    ? 'Show Explain Text Button'
                    : 'Hide Explain Text Button'
                }
                width={getIsShowExplainText() ? 40 : 44}
                height={getIsShowExplainText() ? 50 : 55}
                src={
                  getIsShowExplainText()
                    ? '/explainer-on-icon.svg'
                    : '/explainer-off-icon.svg'
                }
              ></Image>
            </button>
          </div>
          <div className={styles.sliderSetting}>
            <Slider
              sliderTestName={'size-slider'}
              title={`Array Size : ${getArray().length}`}
              defaultValue={getArray().length}
              max={50}
              onValueChanged={changeSize}
              isRangeExtendable={true}
              extendedRange={1500}
            ></Slider>
            <Slider
              sliderTestName={'speed-slider'}
              title={`Speed : ${getSpeed() / 1000} sec/step`}
              min={1}
              max={1000}
              invert={true}
              defaultValue={getSpeed()}
              onValueChanged={changeSpeed}
            ></Slider>
          </div>
        </div>
        <div className={styles.container}>
          {getIsShowExplainText() && getExplainText().length > 0 ? (
            <div data-cy={'explain-text'} className={styles.explainText}>
              {' '}
              {getExplainText()}
            </div>
          ) : (
            <></>
          )}
          {getArray().map((v, i) => (
            <Bar
              index={i}
              key={i}
              value={v.value}
              color={v.color}
              leanMode={leanMode}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1>{getName()}</h1>
        <p>{getDescription()}</p>
        <p>Worst case: {getComplexity().worstCase}</p>
        <p>Average case: {getComplexity().averageCase}</p>
        <p>Best case: {getComplexity().bestCase}</p>
      </div>
    </div>
  );
}
