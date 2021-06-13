import { Popover } from '@headlessui/react';
import { EmojiIcon } from '../icon';

const emojis = [
    '😘', '😍', '😏', '😉', '😌', '🤣', '😂', '😅',
    '😄', '🤑', '🙎', '🕵️', '😴', '🤧', '😵', '👍',
    '💪', '💁', '🍓', '🥑', '🍷', '🎂', '🚎', '♥️',
    '🏃', '🙏', '😡', '😜️', '🎵'
]

const IconsEmoji = ({content, setContent}) => {
  
  return (
    <Popover className="absolute z-50 top-2 right-4">
    <Popover.Button className="focus:outline-none text-gray-900 hover:text-gray-600"><EmojiIcon/></Popover.Button>

    <Popover.Panel className="-mt-12 absolute right-4 top-0 z-10 bg-bluegray-900 w-40 rounded-md">
      <div className="flex flex-wrap">
        {emojis.map((emoji, index) => (<span onClick={() => setContent(content + emoji)} key={index} className="m-0.5 cursor-pointer">{emoji}</span>))}
      </div>

      <img src="/solutions.jpg" alt="" />
    </Popover.Panel>
  </Popover>
  );
};

export default IconsEmoji;
