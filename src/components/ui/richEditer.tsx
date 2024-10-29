import ImageResize from 'quill-image-resize-module-react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

Quill.register('modules/imageResize', ImageResize)

interface EditorProps {
  placeholder?: string
  value: string
  onChange?: (html: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Editor: React.FC<EditorProps> & { modules?: any; formats?: any } = ({ placeholder, value, onChange }) => {
  const handleChange = (html: string) => {
    if (onChange) {
      onChange(html)
    }
  }

  return (
    <ReactQuill
      theme='snow'
      onChange={handleChange}
      value={value}
      modules={Editor.modules}
      formats={Editor.formats}
      bounds='#root'
      placeholder={placeholder}
      className='w-full border-none h-full flex flex-col flex-wrap'
    />
  )
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

export default Editor
