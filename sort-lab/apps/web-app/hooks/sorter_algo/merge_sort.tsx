import { useContext } from 'react';
import { ArrayCtx } from '../../context/arrayContext';
import { COLORS, getRandomColor } from '../../styles/color';
import { Item, SortAlgorithm } from '../sorter_abstract';

export const useMergeSort: () => SortAlgorithm = () => {
  const {
    itemArrayRef,
    isStopRef,
    stopSort,
    replaceItem,
    updateColorFromRange,
    setExplainText,
  } = useContext(ArrayCtx);

  const info = {
    name: 'Merge Sort',
    description:
      'Merge Sort is a Divide and Conquer algorithm. It will keep dividing the array into two halves until it becomes undividable, then it will start merging each pair of halves back together(array will be sorted during this merging process)',
    complexity: {
      bestCase: 'O(n log(n))',
      averageCase: 'O(n log(n))',
      worstCase: 'O(n log(n))',
    },
  };

  const sort = async () => {
    const arr: Item[] = [...itemArrayRef.current];

    await mergeSort(arr, 0, arr.length - 1);
    if (!isStopRef.current)
      await updateColorFromRange(0, arr.length - 1, COLORS.SORTED);
  };
  // l is for left index and r is
  // right index of the sub-array
  // of arr to be sorted */
  const mergeSort = async (arr: Item[], l: number, r: number) => {
    if (isStopRef.current) return await stopSort();

    if (l >= r) {
      return; //  If the array has only one element (l , r is point at the same), return
      // why? because we need to have at least 2 elements to merge
    }
    const m = l + Math.floor((r - l) / 2); //divide the array into two halves
    const n1 = m - l + 1; // size of the left subarray (l to m) we need to +1 because we need to include the m
    const n2 = r - m; // size of the right subarray
    setExplainText(
      `Dividing Array into two subarrays(left: ${n1} items, right: ${n2} items)`
    );
    await updateColorFromRange(l, m, getRandomColor());
    await updateColorFromRange(m + 1, r, getRandomColor());

    await mergeSort(arr, l, m); // start to middle of the array (left)
    await mergeSort(arr, m + 1, r); // middle+1 to end of the array (right)

    await merge(arr, l, m, r); // merge the two halves
  };
  // Merges two subarrays of arr[].
  // First subarray is arr[l..m]
  // Second subarray is arr[m+1..r]
  const merge = async (arr: Item[], l: number, m: number, r: number) => {
    if (isStopRef.current) return await stopSort();

    const n1 = m - l + 1; // size of the left subarray (l to m) we need to +1 because we need to include the m
    const n2 = r - m; // size of the right subarray
    setExplainText(`Merging sub array into array of ${n1 + n2} items`);
    // Create temp arrays
    const L = new Array(n1);
    const R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = l;

    while (i < n1 && j < n2) {
      if (isStopRef.current) return await stopSort();

      if (L[i].value <= R[j].value) {
        arr[k] = L[i];
        await replaceItem(k, L[i], true);
        i++;
        // animation here
      } else {
        arr[k] = R[j];
        await replaceItem(k, R[j], true);
        j++;
        // animation here
      }
      k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
      if (isStopRef.current) return await stopSort();
      arr[k] = L[i];
      await replaceItem(k, L[i], true);
      i++;
      k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
      if (isStopRef.current) return await stopSort();
      arr[k] = R[j];
      await replaceItem(k, R[j], true);
      j++;
      k++;
    }
    if (isStopRef.current) return await stopSort();

    await updateColorFromRange(l, r, getRandomColor());
  };

  return { sort, info };
};
