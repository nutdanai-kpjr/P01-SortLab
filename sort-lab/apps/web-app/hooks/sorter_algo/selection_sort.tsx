import { useContext } from 'react';
import { ArrayCtx } from '../../context/arrayContext';
import { COLORS } from '../../styles/color';
import { Item, SortAlgorithm } from '../sorter_abstract';
import { AudioType } from '../sorter_audio';

export const useSelectionSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    swapItem,
    isStopRef,
    stopSort,
    updateColor,
    updateDifferentColor,
    audioPlayer,
    setExplainText,
  } = useContext(ArrayCtx);

  const info = {
    name: 'Selection Sort',
    description:

      'Selection Sort is a simple sorting algorithm that works by maintaining two subarrays, sort and unsorted. It will repeatedly find the minimum element from the unsorted subarray and move it to the sorted subarray.',

    complexity: {
      bestCase: 'O(n^2)',
      averageCase: 'O(n^2)',
      worstCase: 'O(n^2)',
    },
  };

  const sort = async () => {
    let arr: Item[] = [...itemArrayRef.current];

    for (let i = 0; i < arr.length; i++) {
      // FInd the smallest element in the unsorted array
      // await updateColor([i], COLORS.COMPARE);
      let min = i;

      for (let j = i + 1; j < arr.length; j++) {
        if (isStopRef.current) {
          return await stopSort();
        }

        arr = [...itemArrayRef.current]; // refetch the array from context to avoid stale state
        const valueNew = { ...arr[j] }.value;
        const valueMin = { ...arr[min] }.value;
        const minValue = Math.min(valueNew, valueMin);
        audioPlayer.playAudio(AudioType.Default);
        setExplainText(
          `Finding the min item : Candidate is ${minValue}  (Round ${i + 1})`
        );

        await updateDifferentColor([
          { index: min, color: COLORS.SPECIAL },
          { index: j, color: COLORS.COMPARE },
        ]);
        //Comparing;
        if (valueNew < valueMin) {
          await updateColor([min], COLORS.DEFAULT);
          min = j;
          audioPlayer.playAudio(AudioType.Default);
          await updateColor([min], COLORS.SPECIAL);
        } else {
          await updateColor([j, min], COLORS.DEFAULT); // Loser
        }
      }
      // await updateColor([min], COLORS.SORTED);
      await updateColor([min], COLORS.SPECIAL);

      if (min !== i) {
        audioPlayer.playAudio(AudioType.Success);
        await swapItem(i, min);
      }
      setExplainText(`Finishing...`);
      await updateColor([i], COLORS.SORTED);
    }
  };
  return { sort, info };
};
