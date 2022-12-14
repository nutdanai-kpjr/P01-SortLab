import { useContext } from 'react';
import { ArrayCtx } from '../../context/arrayContext';
import { COLORS } from '../../styles/color';
import { Item, SortAlgorithm } from '../sorter_abstract';
import { AudioType } from '../sorter_audio';

export const useBubbleSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    isStopRef,
    swapItem,
    stopSort,
    updateColor,
    updateDifferentColor,
    audioPlayer,
    setExplainText,
  } = useContext(ArrayCtx);
  // const itemArrayRef = useRef(itemArray);
  const info = {
    name: 'Bubble Sort',
    description:
      'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.',
    complexity: {
      bestCase: 'O(n)',
      averageCase: 'O(n^2)',
      worstCase: 'O(n^2)',
    },
  };

  const sort = async () => {
    // console.log("BubbleFunction", itemArrayRef.current.length);

    let arr: Item[] = [...itemArrayRef.current];

    for (let i = 0; i < arr.length; i++) {
      // console.log(i);

      for (let j = 0; j < arr.length - i - 1; j++) {
        if (isStopRef.current) return await stopSort();
        arr = [...itemArrayRef.current]; // refetch the array from context to avoid stale state

        const valueA = { ...arr[j] }.value;
        const valueB = { ...arr[j + 1] }.value;
        const maxValue = Math.max(valueA, valueB);
        setExplainText(
          `Moving the max item into proper place : Candidate is ${maxValue} (Round ${
            i + 1
          })`
        );
        await updateColor([j, j + 1], COLORS.COMPARE); // Comparing
        if (valueA > valueB) {
          // console.log(valueA + ">" + valueB + " swap " + j + " to " + (j + 1));
          await updateColor([j], COLORS.SORTED);
          await swapItem(j, j + 1); // swazp j to j+1
        }

        audioPlayer.playAudio(AudioType.Default);

        await updateDifferentColor([
          { index: j, color: COLORS.DEFAULT },
          { index: j + 1, color: COLORS.SORTED },
        ]); // Loser, Winner
      }

      await updateColor([0], COLORS.SORTED); // update the leftover one element.
    }
  };
  return { sort, info };
};
