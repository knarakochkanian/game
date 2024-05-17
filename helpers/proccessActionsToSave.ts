const proccessActionsToSave = (
  currentAction: IAction,
  actionsFromStorage: IAction[],
  isCompleted: boolean
) => {
  const currentActionCopy = { ...currentAction };
  currentActionCopy.isCompleted = isCompleted;

  if (actionsFromStorage) {
    return [...actionsFromStorage, currentActionCopy];
  } else {
    return [currentActionCopy];
  }
};

export default proccessActionsToSave;
