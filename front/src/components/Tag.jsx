import React from 'react';

export default function Tag(props) {
  return (
      <kbd className="px-3 py-1.5 mx-1 font-semibold text-white bg-neutral-600 border rounded-full text-lg">
        #{props.props}
      </kbd>

  );
}
