"strict";

//           11 1111111222222
//0123456789012 3456789012345
//abcdefghijklm nopqrstuvwxyz

// This accomodates both lower and uppercase,
// so text doesn't have to be normalized as much.
exports.alphaIndex = {
  a:0, A:0, b:1, B:1, c:2, C:2, d:3, D:3, e:4, E:4, f:5, F:5, g:6, G:6,
  h:7, H:7, i:8, I:8, j:9, J:9, k:10, K:10, l:11, L:11, m:12, M:12, n:13, N:13,
  o:14, O:14, p:15, P:15, q:16, Q:16, r:17, R:17, s:18, S:18, t:19, T:19,
  u:20, U:20, v:21, V:21, w:22, W:22, x:23, X:23, y:24, Y:24, z:25, Z:25 };

// undefined => haqrsvarq
exports.rot13map = [
  'n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m'];

exports.identityMap = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

