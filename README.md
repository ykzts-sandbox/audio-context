# `AudioContext`

[Web Audio API](https://www.w3.org/TR/2015/WD-webaudio-20151208/)の検証のために[`AudioContext` interface](https://www.w3.org/TR/2015/WD-webaudio-20151208/#AudioContext)で遊ぼうという趣旨のもとにいろいろとしています。

## [volume](/volume) ([demo](https://ykzts-sandbox.github.io/audio-context/volume/))

`AudioContext`で音の大きさを取ってみようとする試み。

[`navigator.mediaDevices.getUserMedia`](https://www.w3.org/TR/2016/CR-mediacapture-streams-20160519/#dom-mediadevices-getusermedia)からマイクの入力を[`MediaStream` interface](https://www.w3.org/TR/2016/CR-mediacapture-streams-20160519/#mediastream)の形で受けとり、それを`AudioContext` interfaceから作られたオブジェクトに接続しています。

そして`AudioContext.prototype.createAnalyser` methodで取得した`AnalyzerNode`で音量の取得をしています。

それぞれの音域の状態を取り、それを安直に足すという形で実施していますが、これが正しいやり方であるかどうかには疑問が残っています。ただ、[実装者](https://github.com/ykzts)が音に対する造詣に乏しいためこのような形になっています。

## [gain](/gain) ([demo](https://ykzts-sandbox.github.io/audio-context/gain/))

`AudioContext`で音のゲインをリアルタイムで変動させようとする試み。

`input[type="file"]`の変更を検知して音声ファイルが指定ができるようにしています。音声ファイルの指定がされたら[`FileReader` interface](https://www.w3.org/TR/2015/WD-FileAPI-20150421/#APIASynch)を経由して`ArrayBuffer`の取得をして、`AudioContext.prototype.decodeAudioData` methodで`AudioBuffer`にデコードして`AudioContext`のソースとしています。

そして`AudioContext.prototype.createGain` methodで作られた`GainNode`の値を変化させる`input[type="range"]`を作り、自由にゲインを弄れるようにしました。
