import { TableCell, TableRow } from '@material-ui/core';
import React, { FC, useCallback } from 'react';

import RemoveButton from 'src/components/RemoveButton';
import { useTypedSelector } from 'src/redux';
import { deleteProcess } from 'src/redux/entities/processes/actions';
import { selectById } from 'src/redux/entities/processes/selectors';

type Props = {
  id: string;
};

const ContentRow: FC<Props> = ({ id }) => {
  const handleDeleteProcess = useCallback(() => deleteProcess(id), [id]);

  const process = useTypedSelector((state) => selectById(state, id))!;

  return (
    <>
      <TableRow>
        <TableCell>{process.name}</TableCell>
        <TableCell align="center">{process.jobsCount}</TableCell>
        <TableCell padding="none" align="right">
          <RemoveButton action={handleDeleteProcess} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default ContentRow;
