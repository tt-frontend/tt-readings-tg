import { useCallback, useEffect } from "react";

export const useSwitchInputOnEnter = (name: string, focusOnFirst: boolean) => {
   const next = useCallback(
      (index: number) => {
         const inputList: NodeListOf<HTMLInputElement> =
            document.querySelectorAll(`[data-reading-input="${name}"]`);

         if (!inputList.length) {
            return null;
         }

         const nextNode = inputList[index];
         const currentNode = inputList[index - 1];

         if (nextNode) {
            nextNode.focus();
            return;
         }
         if (!nextNode) {
            currentNode.blur();
            return;
         }
      },
      [name]
   );

   useEffect(() => {
      if (focusOnFirst) next(-1);
   }, [focusOnFirst, next]);

   return next;
};
