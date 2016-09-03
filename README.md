# `AudioContext`

[Web Audio API](https://www.w3.org/TR/2015/WD-webaudio-20151208/)の検証のために[`AudioContext` interface](https://www.w3.org/TR/2015/WD-webaudio-20151208/#AudioContext)で遊ぼうという趣旨のもとにいろいろとしています。

## [volume](/volume) ([demo](https://ykzts-sandbox.github.io/audio-context/volume/))

`AudioContext`で音の大きさを取ってみようとする試み。

[`navigator.mediaDevices.getUserMedia`](https://www.w3.org/TR/2016/CR-mediacapture-streams-20160519/#dom-mediadevices-getusermedia)からマイクの入力を[`MediaStream` interface](https://www.w3.org/TR/2016/CR-mediacapture-streams-20160519/#mediastream)の形で受けとり、それを`AudioContext` interfaceから作られたオブジェクトに接続しています。

そして`AudioContext.prototype.createAnalyser` methodで取得した`AnalyzerNode`で音量の取得をしています。

それぞれの音域の状態を取り、それを安直に足すという形で実施していますが、これが正しいやり方であるかどうかには疑問が残っています。ただ、[実装者](https://github.com/ykzts)が音に対する造詣に乏しいためこのような形になっています。
