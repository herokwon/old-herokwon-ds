import type { IconType } from 'react-icons';
import {
  FaCircleCheck,
  FaCircleInfo,
  FaCommentDots,
  FaTriangleExclamation,
} from 'react-icons/fa6';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';

import type { ElementExtendedSize, FeedbackVariant, Months } from '../../types';

export const ELEMENT_BASE_SIZES = ['sm', 'md', 'lg'] as const;
export const ELEMENT_EXTENDED_SIZES = [
  'xs',
  ...ELEMENT_BASE_SIZES,
  'xl',
] as const;
export const ELEMENT_SPACINGS = ['default', 'compact', 'none'] as const;
export const ELEMENT_BASE_VARIANTS = [
  'default',
  'primary',
  'secondary',
] as const;
export const ELEMENT_EXTENDED_VARIANTS = [
  ...ELEMENT_BASE_VARIANTS,
  'warning',
  'danger',
] as const;
export const ELEMENT_DIRECTIONS = ['horizontal', 'vertical'] as const;

export const FEEDBACK_VARIANTS = [
  'default',
  'success',
  'info',
  'warning',
  'danger',
] as const;

export const ALIGNMENTS_X = ['left', 'center', 'right'] as const;
export const ALIGNMENTS_Y = ['top', 'middle', 'bottom'] as const;

export const SELECTING_INPUTS = [
  'text',
  'multi-text',
  'radio',
  'checkbox',
] as const;
export const TEXT_INPUTS = [
  'email',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'url',
] as const;
export const DATETIME_INPUTS = [
  'date',
  'datetime-local',
  'month',
  'time',
  'week',
] as const;

export const CALENDAR_FORMS = ['monthly', 'yearly'] as const;
export const MONTHS: Months[] = new Proxy(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  {
    get(target, prop, receiver) {
      if (!isNaN(Number(prop)) && Number(prop) < 0)
        prop = `${Number(prop) + target.length}`;
      if (!isNaN(Number(prop)) && Number(prop) >= target.length)
        prop = `${Number(prop) % target.length}`;

      return Reflect.get(target, prop, receiver);
    },
  },
);

export const ICON_SIZE: { [size in ElementExtendedSize]: number } = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

export const FEEDBACK_ICONS: { [variant in FeedbackVariant]: IconType } = {
  default: FaCommentDots,
  success: FaCircleCheck,
  info: FaCircleInfo,
  warning: FaTriangleExclamation,
  danger: BsFillExclamationDiamondFill,
};

export const CODE_LANGUAGES = [
  // starts_with_a
  'abap',
  'abnf',
  'actionscript',
  'ada',
  'agda',
  'al',
  'antlr4',
  'apacheconf',
  'apex',
  'apl',
  'applescript',
  'aql',
  // 'arduino',
  'arff',
  'armasm',
  'arturo',
  'asciidoc',
  'asm6502',
  'asmatmel',
  'aspnet',
  'autohotkey',
  'autoit',
  'avisynth',
  'avro-idl',
  'awk',

  // starts_with_b
  'bash',
  'basic',
  'batch',
  'bbcode',
  'bbj',
  'bicep',
  'birb',
  // 'bison',
  'bnf',
  'bqn',
  'brainfuck',
  'brightscript',
  'bro',
  'bsl',

  // starts_with_c
  'c',
  'cfscript',
  // 'chaiscript',
  'cil',
  'cilkc',
  'cilkcpp',
  'clike',
  'clojure',
  'cmake',
  'cobol',
  'coffeescript',
  'concurnas',
  'cooklang',
  'coq',
  // 'core',
  'cpp',
  // 'crystal',
  'csharp',
  'cshtml',
  'csp',
  'css-extras',
  'css',
  'csv',
  'cue',
  'cypher',

  // starts_with_d
  'd',
  'dart',
  'dataweave',
  'dax',
  'dhall',
  'diff',
  // 'django',
  'dns-zone-file',
  'docker',
  'dot',

  // starts_with_e
  'ebnf',
  'editorconfig',
  'eiffel',
  'ejs',
  'elixir',
  'elm',
  'erb',
  'erlang',
  'etlua',
  'excel-formula',

  // starts_with_f
  'factor',
  'false',
  'firestore-security-rules',
  'flow',
  'fortran',
  'fsharp',
  'ftl',

  // starts_with_g
  'gap',
  'gcode',
  'gdscript',
  'gedcom',
  'gettext',
  'gherkin',
  'git',
  'glsl',
  'gml',
  'gn',
  'go-module',
  'go',
  'gradle',
  'graphql',
  'groovy',

  // starts_with_h
  'haml',
  'handlebars',
  'haskell',
  'haxe',
  'hcl',
  'hlsl',
  'hoon',
  'hpkp',
  'hsts',
  'http',

  // starts_with_i
  'ichigojam',
  'icon',
  'icu-message-format',
  'idris',
  'iecst',
  'ignore',
  'inform7',
  'ini',
  'io',

  // starts_with_j
  'j',
  'java',
  // 'javadoc',
  'javadoclike',
  'javascript',
  'javastacktrace',
  'jexl',
  'jolie',
  'jq',
  'js-extras',
  'js-templates',
  // 'jsdoc',
  'json',
  'json5',
  'jsonp',
  'jsstacktrace',
  'jsx',
  'julia',

  // starts_with_k
  'keepalived',
  'keyman',
  'kotlin',
  'kumir',
  'kusto',

  // starts_with_l
  'latex',
  'latte',
  'less',
  'lilypond',
  'linker-script',
  'liquid',
  'lisp',
  'livescript',
  'llvm',
  'log',
  'lolcode',
  'lua',

  // starts_with_m
  'magma',
  'makefile',
  'markdown',
  'markup-templating',
  'markup',
  'mata',
  'matlab',
  'maxscript',
  'mel',
  'mermaid',
  'metafont',
  'mizar',
  'mongodb',
  'monkey',
  'moonscript',

  // starts_with_n
  'n1ql',
  'n4js',
  'nand2tetris-hdl',
  'naniscript',
  'nasm',
  'neon',
  'nevod',
  'nginx',
  'nim',
  'nix',
  'nsis',

  // starts_with_o
  'objectivec',
  'ocaml',
  'odin',
  'opencl',
  'openqasm',
  'oz',

  // starts_with_p
  'parigp',
  'parser',
  'pascal',
  'pascaligo',
  'pcaxis',
  'peoplecode',
  'perl',
  'php-extras',
  'php',
  'phpdoc',
  'plant-uml',
  // 'plsql',
  'powerquery',
  'powershell',
  'processing',
  'prolog',
  'promql',
  'properties',
  'protobuf',
  'psl',
  'pug',
  'puppet',
  'pure',
  'purebasic',
  'purescript',
  'python',

  // starts_with_q
  'q',
  'qml',
  'qore',
  'qsharp',

  // starts_with_r
  'r',
  // 'racket',
  'reason',
  'regex',
  'rego',
  'renpy',
  'rescript',
  'rest',
  'rip',
  'roboconf',
  'robotframework',
  'ruby',
  'rust',

  // starts_with_s
  'sas',
  'sass',
  'scala',
  'scheme',
  'scss',
  'session',
  'smali',
  'smalltalk',
  'smarty',
  'sml',
  'solidity',
  'solution-file',
  'soy',
  // 'sparql',
  'splunk-spl',
  'sqf',
  'sql',
  'squirrel',
  'stan',
  'stata',
  'stylus',
  'supercollider',
  'swift',
  'systemd',

  // starts_with_t
  // 't4-cs',
  't4-templating',
  't4-vb',
  'tap',
  'tcl',
  'textile',
  'toml',
  'tremor',
  'tsx',
  'tt2',
  'turtle',
  'twig',
  'typescript',
  'typoscript',

  // starts_with_u
  'unrealscript',
  'uorazor',
  'uri',

  // starts_with_v
  'v',
  'vala',
  'vbnet',
  'velocity',
  'verilog',
  'vhdl',
  'vim',
  'visual-basic',

  // starts_with_w
  'warpscript',
  'wasm',
  'web-idl',
  'wgsl',
  'wiki',
  'wolfram',
  'wren',

  // starts_with_x
  'xeora',
  'doc',
  'xojo',
  'xquery',

  // starts_with_y
  'yaml',
  'yang',

  // starts_with_z
  'zig',
] as const;
