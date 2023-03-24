import React from 'react';

export default function Tag(props) {
  return (
    <kbd className="px-2 py-1.5 font-semibold text-white bg-neutral-600 border rounded-full">
      # 임시 {props.type}
    </kbd>
  );
}
