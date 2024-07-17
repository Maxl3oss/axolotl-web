'use client';

import { FilePlus2Icon, ImagePlusIcon, MessageSquarePlus, Youtube } from 'lucide-react';
import React from 'react'
import { TypeNodeName } from '..';

type props = {
  addNode: (typeNode: TypeNodeName) => void;
}

function Tools({ addNode }: props) {

  return (
    <section className="z-50 absolute w-full">
      <div className="grid place-content-center">
        <div className="flex w-fit h-full bg-white">
          <button
            className="p-[6px]"
            type="button"
            onClick={() => addNode("customNode")}
          >
            <FilePlus2Icon width={18} height={18} className="text-background" />
          </button>
          <button
            className="p-[6px] border-x border-gray-200"
            type="button"
            onClick={() => addNode("annotation")}
          >
            <MessageSquarePlus width={18} height={18} className="text-background" />
          </button>
          <button
            className="p-[6px] border-x border-gray-200"
            type="button"
            onClick={() => addNode("circle")}
          >
            <ImagePlusIcon width={18} height={18} className="text-background" />
          </button>
          <button
            className="p-[6px]"
            type="button"
            onClick={() => addNode("youtube")}
          >
            <Youtube width={18} height={18} className="text-background" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Tools;