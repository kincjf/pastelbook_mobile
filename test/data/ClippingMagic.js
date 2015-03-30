/**
 * Created by KIMSEONHO on 2015-03-18.
 */
define("const", [], function () {
	var e = {};
	return e.MouseButtonLeft = 1, e.MaxNumPixels = window.Globals.MaxNumPixels, e.LoupeRadius = 120, e.ScreenshotMode = window.Globals.isDev && !1, e.IncludeOriginal = !1, e.LightProgress = "light-progress", e.LightConnecting = "light-connecting", e.LightUpdating = "light-updating", e.LightUpdated = "light-updated", e.SaveSave = "Save", e.SaveSaving = "Saving...", e.SaveSaved = "Saved", e.Noop = "Noop", e.SetTool = "SetTool", e.SetGlobal = "SetGlobal", e.SetUserMask = "SetUserMask", e.SetHairMask = "SetHairMask", e.SetHairPalette = "SetHairPalette", e.GenerateResult = "GenerateResult", e.DrawSquare = "DrawSquare", e.DrawLine = "DrawLine", e.Meta = "Meta", e.StatusCheck = "StatusCheck", e.AnalyzeImage = "AnalyzeImage", e.EngineInitialized = "EngineInitialized", e.Panic = "Panic", e.Message = "Message", e.SaveServerMask = "SaveServerMask", e.SetSwords = "SetSwords", e.SetActiveSwords = "SetActiveSwords", e.SetClientShadows = "SetClientShadows", e.DirtiesDrawCommandsSet = {
		SetGlobal: !0,
		SetUserMask: !0,
		SetHairMask: !0,
		SetHairPalette: !0,
		DrawSquare: !0,
		DrawLine: !0,
		SetSwords: !0,
		SetClientShadows: !0,
		dummy: !1
	}, e.Skip = "Skip", e.Exiting = "Exiting", e.Exit = "Exit", e.Error = "Error", e.MaybeSaved = "MaybeSaved", e.DocumentReady = "DocumentReady", e.Booted = "Booted", e.SavedAndResultReady = "SavedAndResultReady", e.ServerMask = "ServerMask", e.ServerMaskDone = "ServerMaskDone", e.EmptyServerMask = "EmptyServerMask", e.BezierSet = "BezierSet", e.BezierSetDone = "BezierSetDone", e.UpdateComplete = "UpdateComplete", e.ResultReady = "ResultReady", e.ResultPending = "ResultPending", e.BoundingRect = "BoundingRect", e.MaskCounts = "MaskCounts", e.CropUnconstrained = "CropUnconstrained", e.CropLockedAspectRatio = "CropLockedAspectRatio", e.CropTargetSize = "CropTargetSize", e.FactoryDefaults = {
		brushSize: 20,
		backgroundColor: null,
		cropMode: "CropUnconstrained",
		cropFitToResult: !1,
		cropPaddingMils: 50,
		cropAspectRatio: null,
		cropTargetSize: null,
		cropAllowEnlarging: !1,
		globalBlurLevel: 1,
		globalSmoothingLevel: 1,
		globalOffset: 0,
		isAutoEdge: !1,
		autoLevels: !1
	}, e.AspectRatios = [{
		w: 1,
		h: 1
	}, {
		w: 5,
		h: 4
	}, {
		w: 4,
		h: 3
	}, {
		w: 3,
		h: 2
	}, {
		w: 1.618,
		h: 1
	}, {
		w: 16,
		h: 9
	}], e.LineOuterWidth = 3.5, e.LineInnerWidth = 2, e
}), define("util", ["const"], function (e) {
	var t = {};
	t.fuzzyAspectRatio = function (t) {
		for (var o = t.w / t.h, n = 0; n < e.AspectRatios.length; n++) {
			var r = e.AspectRatios[n],
				a = r.w / r.h;
			if (Math.abs((o - a) / a) < .01) return r
		}
		return t.w > t.h ? {
			w: t.w / t.h,
			h: 1
		} : {
			w: 1,
			h: t.h / t.w
		}
	}, t.toFixed = function (e, t) {
		return e.toFixed(t).replace(/\.?0+$/, "")
	}, t.roundTo = function (e, t) {
		return Math.round(e / t) * t
	}, t.empty = function () {}, t.clamp = function (e, t, o) {
		return Math.max(t, Math.min(o, e))
	}, t.posMod = function (e, t) {
		return (e % t + t) % t
	}, t.negMod = function (e, t) {
		return (e % t - t) % t
	}, t.minMod = function (e, o) {
		var n = t.posMod(e, o),
			r = t.negMod(e, o);
		return Math.abs(n) <= Math.abs(r) ? n : r
	}, t.imageIsReady = function (e) {
		return null != e && 0 != e.width && 0 != e.height
	}, t.copyProperties = function (e, t) {
		for (var o in t) e[o] = t[o]
	}, t.copy = function (e) {
		var o = {};
		return t.copyProperties(o, e), o
	};
	var o = [];
	return t.tic = function () {
		o.push(t.currentTimeMillis())
	}, t.toc = function (e) {
		console.log(e, t.currentTimeMillis() - o.pop())
	}, t.fatalError = function (o) {
		console.log("Util.fatalError", o), t.spinner(!1), t.progress(!1), "string" != typeof o && (o = t.stringify(o)), Globals.Bulk.isIframe || Globals.Bulk.isApi ? checkPostMessage({
			command: e.Error,
			error: {
				code: 2e3,
				status: 400,
				message: o
			}
		}) : ($("#fatal-error-p").text(o), t.modal("#fatal-error")), t.gaTrack("ErrorShown", "Fatal", o)
	}, t.spinner = function (e) {
		e ? t.modal("#spinner-lightbox") : $("#spinner-lightbox").modal("hide")
	}, t.progress = function (e) {
		e ? t.modal("#progress-lightbox") : $("#progress-lightbox").modal("hide")
	}, t.progressUpdate = function (e) {
		$("#progress-lightbox-bar").attr("style", "width:" + e + "%")
	}, t.saveAndExit = function (e) {
		e ? t.modal("#save-and-exit-lightbox") : $("#save-and-exit-lightbox").modal("hide")
	}, t.isFunction = function (e) {
		var t = {};
		return e && "[object Function]" === t.toString.call(e)
	}, t.loadImageFromBlob = function (e, t, o) {
		var n = new Image;
		n.onload = function () {
			window.URL.revokeObjectURL(n.src), o(n)
		}, n.onerror = t, n.src = window.URL.createObjectURL(e)
	}, t.dropExtension = function (e) {
		var t = e.split(".");
		return t.pop(), t.join(".")
	}, t.getExtension = function (e) {
		var t = e.split(".");
		return t.pop()
	}, t.currentTimeMillis = function () {
		return (new Date).getTime()
	}, t.parsePx = function (e) {
		try {
			return parseInt(e)
		} catch (t) {
			return 0
		}
	}, t.colorBytesToRgbaCss = function (e) {
		return "rgba(" + e.join(",") + ")"
	}, t.colorBytesToAbgr32 = function (e) {
		return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
	}, t.colorBytesToRgba32 = function (e) {
		return e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3]
	}, t.makeBufferReader = function (e) {
		var t = {},
			o = t.data = new Uint8Array(e.arraybuffer),
			n = t.defaultIntSize = e.intSize,
			r = 0,
			a = 0;
		return t.offsetCount = 0, t.length = function () {
			return o.length
		}, t.hasMore = function () {
			return t.offsetCount < o.length
		}, t.nonEmpty = function () {
			return o.length > 0
		}, t.readInt8 = function () {
			var e = t.offsetCount,
				n = o[e];
			return t.offsetCount += 1, n
		}, t.readInt16 = function () {
			var e = t.offsetCount,
				n = 256 * o[e] + o[e + 1];
			return t.offsetCount += 2, n
		}, t.readInt24 = function () {
			var e = t.offsetCount,
				n = 256 * o[e] * 256 + 256 * o[e + 1] + o[e + 2];
			return t.offsetCount += 3, n
		}, t.readInt32 = function () {
			var e = t.offsetCount,
				n = 256 * o[e] * 256 * 256 + 256 * o[e + 1] * 256 + 256 * o[e + 2] + o[e + 3];
			return t.offsetCount += 4, n
		}, t.readSignedInt16 = function () {
			var e = t.readInt16();
			return e >= 32768 && (e -= 65536), e
		}, t.readBit = function () {
			0 == a && (r = t.readInt8(), a = 8);
			var e = (128 & r) >> 7;
			return r <<= 1, a--, e
		}, "Int8" == n ? t.readIntDefaultSize = t.readInt8 : "Int16" == n ? t.readIntDefaultSize = t.readInt16 : "Int24" == n ? t.readIntDefaultSize = t.readInt24 : "Int32" == n && (t.readIntDefaultSize = t.readInt32), t.readIntAdaptiveSize = function () {
			var e = t.readIntDefaultSize();
			return 0 == e && (e = t.readInt32()), e
		}, t
	}, t.spliterate = function (e, t, o) {
		for (var n = 0, r = 0;
		     (r = e.indexOf(t, n)) >= 0;) o(e.substring(n, r)), n = r + t.length;
		n < e.length - 1 && o(e.substring(n, e.length))
	}, t.stringify = function (e) {
		if ("undefined" == typeof e) return "undefined";
		if (null == e) return "null";
		if (e.hasOwnProperty("message")) return e.message || "[No message]";
		if ("string" == typeof e) return e;
		try {
			return JSON.stringify(e)
		} catch (t) {
			return e.toString()
		}
	}, t.join16 = function (e, t) {
		return e.map(function (e) {
			return (0 | e).toString(16)
		}).join(t)
	}, t.gaTrack = function (e, t, o, n) {
		ga("send", "event", e, t, o, n, {
			nonInteraction: 1
		})
	}, t.modal = function (e, t) {
		var o = $(e);
		o.modal(t ? {
			backdrop: !0,
			keyboard: !0
		} : {
			backdrop: "static",
			keyboard: !1
		});
		var n = $(".modal-backdrop"),
			r = 1040 + 2 * (n.size() - 1);
		n.last().css("z-index", r), o.css("z-index", r + 1)
	}, t.blink = function (e, t, o) {
		function n() {
			a.fadeIn(t, r)
		}
		
		function r() {
			--o > 0 && a.fadeOut(t, n)
		}
		t = t || 200, o = o || 3;
		var a = $(e);
		a.fadeOut(t, n)
	}, t.now = Date.now ? Date.now : function () {
		return (new Date).getTime()
	}, t.randomInt = function (e) {
		return Math.floor(Math.random() * e)
	}, t.mouseDownRepeater = function (e, t, o, n, r) {
		function a() {
			t(), s = setTimeout(a, o)
		}
		
		function i() {
			r && r(), clearTimeout(s), e.off("mouseup mouseout", i)
		}
		var s = null;
		e.mousedown(function () {
			e.on("mouseup mouseout", i), n && n(), a()
		})
	}, t.centerElide = function (e, t, o) {
		return e && e.length >= t ? (o > t && (o = t), o = Math.floor(o / 2), e.substring(0, o) + "..." + e.substring(e.length - o)) : e
	}, t.sqr = function (e) {
		return e * e
	}, t
}), define("filedropper", ["util"], function (e) {
	var t, o = {},
		n = {
			monitor_file_input: null,
			hover_class: "drop-ready",
			error: e.empty,
			drop: e.empty,
			dragStart: e.empty,
			dropOnce: !0
		},
		r = !0;
	o.disable = function () {
		r = !1
	}, o.initialize = function (e) {
		function o(e, t) {
			r && (null === e || void 0 === e || 0 === e.length ? c.error(t + " a non-file input") : (c.drop.call(this, e), c.dropOnce && (r = !1)))
		}
		
		function a(e) {
			return i("drop", e, !1), o(e.originalEvent.dataTransfer.files, "Dropped"), !1
		}
		
		function i(e, o, n) {
			clearTimeout(t), o.stopImmediatePropagation(), o.preventDefault(), d.toggleClass(c.hover_class, n)
		}
		
		function s(e) {
			i("dragEnter", e, !0)
		}
		
		function l(e) {
			i("dragOver", e, !0), e.originalEvent.dataTransfer.dropEffect = r ? "copy" : "none"
		}
		
		function u(e) {
			t = setTimeout(function () {
				i("dragLeave", e, !1)
			}, 100)
		}
		var c = $.extend({}, n, e),
			d = $("body");
		return $(document).on("drop.FileDropper", a).on("dragstart.FileDropper", c.dragStart).on("dragenter.FileDropper", s).on("dragover.FileDropper", l).on("dragleave.FileDropper", u), c.monitor_file_input && c.monitor_file_input.change(function (e) {
			o(e.originalEvent.target.files, "Picked")
		}), this
	};
	try {
		XMLHttpRequest.prototype.sendAsBinary || (XMLHttpRequest.prototype.sendAsBinary = function (e) {
			function t(e) {
				return 255 & e.charCodeAt(0)
			}
			var o = Array.prototype.map.call(e, t),
				n = new Uint8Array(o);
			this.send(n.buffer)
		})
	} catch (a) {}
	return o
}), define("retrydialog", ["util"], function (e) {
	function t() {
		var t = $("#retry-dialog-body");
		t.empty();
		var n = $(document.createElement("tr"));
		n.append(o("th", "Task")), n.append(o("th", "Error")), t.append(n);
		for (var r = 0; r < a.length; r++) {
			var i = a[r];
			n = $(document.createElement("tr")), n.append(o("td", i.label)), n.append(o("td", e.stringify(i.err))), t.append(n)
		}
	}
	
	function o(e, t) {
		var o = $(document.createElement(e));
		return o.text(t), o
	}
	
	function n() {
		c = (new Date).getTime(), null != u && (clearInterval(u), u = null), d *= 2, d > l && (d = l), $("#retry-dialog-countdown").text("Retrying now...");
		for (var e = 0; e < a.length; e++) a[e].retryNow()
	}
	
	function r() {
		var e = (new Date).getTime();
		if (e > c + d) n();
		else {
			var o = Math.round((c + d - e) / 1e3);
			$("#retry-dialog-countdown").text("Retrying in " + o + " seconds...")
		}
		t()
	}
	var a = [],
		i = {},
		s = 5e3,
		l = 36e5,
		u = null,
		c = 0,
		d = s,
		p = !1;
	return i.register = function (o) {
		a.indexOf(o) < 0 && (e.gaTrack("ErrorShown", o.label, e.stringify(o.err), null), a.push(o), t()), e.modal("#retry-dialog"), p = !0, null == u && (c = (new Date).getTime(), u = setInterval(r, 1e3))
	}, i.deregister = function (e) {
		var o = a.indexOf(e);
		o >= 0 && (a.splice(o, 1), t()), d = s, c = (new Date).getTime(), 0 == a.length && p && $("#retry-dialog").modal("hide")
	}, i.createRetryable = function (e, t) {
		var o = {
			label: e,
			tries: 0,
			err: null,
			responseText: null,
			pending: !1,
			trying: !1,
			retryNow: function () {
				o.pending || (o.pending = !0, t())
			}
		};
		return o
	}, $(document).ready(function () {
		$("#retry-dialog-retry-now-button").click(function () {
			n(), d = s
		})
	}), i
}), define("fileuploader", ["retrydialog", "util"], function (e, t) {
	{
		var o = {},
			n = {
				label: "Unknown",
				url: "",
				tries: 3,
				paramname: "file",
				withCredentials: !1,
				data: {},
				headers: {},
				progress: t.empty,
				error: function (e) {
					alert(e)
				},
				success: t.empty
			},
			r = o.uploadRaw = function (e, t) {
				var o = $.extend({}, n, t),
					r = new XMLHttpRequest,
					a = r.upload,
					i = ((new Date).getTime(), new FormData);
				$.each(o.headers, function (e, t) {
					r.setRequestHeader(e, t)
				}), $.each(o.data, function (e, t) {
					i.append(e, t)
				}), i.append(o.paramname, e), a.currentProgress = 0, a.onprogress = function (e) {
					if (e.lengthComputable) {
						var t = Math.round(100 * e.loaded / e.total);
						a.currentProgress !== t && (a.currentProgress = t, o.progress(a.currentProgress))
					}
				}, a.onerror = function (e) {
					console.log("FileUploader upload.onerror", e), o.error(e)
				}, a.onabort = function (e) {
					console.log("FileUploader upload.onabort", e), o.error(e)
				}, a.onload = function () {}, o.withCredentials && (r.withCredentials = o.withCredentials), r.onload = function () {
					r.responseText && (r.status < 200 || r.status > 299 ? (console.log("FileUploader onload error", r), o.error(r.statusText + ": " + r.responseText)) : (o.progress(100), o.success(r.responseText)))
				}, r.open("POST", o.url, !0), r.send(i)
			},
			a = o.uploadS3 = function (e, t, o) {
				o.url = window.Globals.s3_url, o.data = {
					key: t.key,
					AWSAccessKeyId: window.Globals.s3_access_key,
					acl: "private",
					success_action_status: 201,
					policy: t.policy,
					signature: t.signature,
					"Content-Type": e.type,
					"Cache-Control": o.maxAge ? "max-age=" + o.maxAge : "no-cache"
				}, r(e, o)
			};
		o.uploadS3WithRetry = function (t, o, r) {
			var i = $.extend({}, n, r),
				s = e.createRetryable(i.label, function () {
					var e = t;
					"function" == typeof e && (e = e()), a(e, o, i)
				});
			i.error = function (e) {
				s.tries += 1, s.err = e, s.pending = !1, s.tries < r.tries ? setTimeout(s.retryNow, 1e3 * s.tries) : r.error(s)
			}, i.success = function (e) {
				s.pending = !1, s.responseText = e, r.success(s)
			}, s.retryNow()
		}
	}
	return o
}), define("canvasex", ["util", "const"], function (e, t) {
	var o = {},
		n = o.dataURItoBlob = function (e) {
			for (var t = e.split(","), o = t[0].split(":")[1].split(";")[0], n = atob(t[1]), r = new Uint8Array(n.length), a = 0; a < n.length; a++) r[a] = n.charCodeAt(a);
			var i = new Blob([r], {
				type: o
			});
			return i.size != r.length && (i = new Blob([r.buffer], {
				type: o
			})), i
		};
	o.thumbnailCanvas = function (e, t, o) {
		var n = r(t, o);
		n.context().fillStyle = "rgb(255,255,255)", n.context().fillRect(0, 0, t, o);
		var a = t / e.width,
			i = o / e.height;
		if (i > a) {
			var s = i * e.width,
				l = (s - t) / 2;
			n.context().drawImage(e, -l, 0, s, o), console.log("CanvasEx.thumbnailCanvas fullW", t, o, a, i, s, l)
		} else {
			var u = a * e.height,
				c = (u - o) / 2;
			n.context().drawImage(e, 0, -c, t, u), console.log("CanvasEx.thumbnailCanvas fullH", t, o, a, i, u, c)
		}
		return n
	}, o.loadImageShrinkAndThumbnail = function (n, r, a) {
		e.loadImageFromBlob(n, r, function (r) {
			if (r = o.shrinkImage(r, t.MaxNumPixels), r.wasShrunk) {
				var i = r.toBlob("image/jpeg", .95);
				i.name = e.dropExtension(n.name) + ".jpeg", n = i
			} else if ("image/gif" == n.type) {
				var i = r.toBlob("image/png");
				i.name = e.dropExtension(n.name) + ".png", n = i
			}
			var s = o.thumbnailCanvas(r, 210, 145).toBlob("image/jpeg", .9);
			a(n, r, s)
		})
	}, o.shrinkImage = function (e, t) {
		var o = e.naturalWidth,
			n = e.naturalHeight,
			a = o,
			i = n,
			s = o * n;
		s > t && (i = Math.floor(Math.sqrt(t * n / o)), a = Math.floor(t / i)), console.log("CanvasEx.shrinkImage", e, o, n, a, i, s, t);
		var l = r(a, i);
		return l.wasShrunk = a != o || i != n, l.context().fillStyle = "rgb(255,255,255)", l.context().fillRect(0, 0, a, i), l.context().drawImage(e, 0, 0, a, i), l
	};
	var r = o.newCanvas = function (e, t) {
		var o = document.createElement("canvas");
		o.width = e, o.height = t;
		var r = null;
		return o.context = function () {
			return null == r && (r = o.getContext("2d"), r.fillCircle = function (e, t, o, n) {
				n && (r.fillStyle = n), r.beginPath(), r.arc(e, t, o, 0, 2 * Math.PI, !0), r.fill()
			}, r.strokeLine = function (e, t, o, n, a, i) {
				a && (r.lineWidth = a), i && (r.strokeStyle = i), r.beginPath(), r.moveTo(e, t), r.lineTo(o, n), r.stroke()
			}, r.triangle = function (e, t, o, n, a, i) {
				var s = 120 * Math.PI / 180;
				a = a ? a : n, i = i ? i : a, r.moveTo(e + n * Math.cos(o), t + n * Math.sin(o)), r.lineTo(e + a * Math.cos(o + s), t + a * Math.sin(o + s)), r.lineTo(e + i * Math.cos(o + 2 * s), t + i * Math.sin(o + 2 * s)), r.closePath()
			}, r.strokeEx = function (e, t, o, n) {
				o && (r.lineJoin = o), n && (r.lineCap = n), r.lineWidth = e, r.strokeStyle = t, r.stroke()
			}, r.fillEx = function (e) {
				r.fillStyle = e, r.fill()
			}, r.mozImageSmoothingEnabled = !1, r.webkitImageSmoothingEnabled = !1, r.msImageSmoothingEnabled = !1, r.imageSmoothingEnabled = !1), r
		}, o.setSize = function (e, t) {
			e > 0 && t > 0 && (o.width = e, o.height = t, r = null)
		}, o.clearAll = function () {
			o.context().clearRect(0, 0, e, t)
		}, o.toBlob = function (e, t) {
			var r = o.toDataURL(e, t);
			return n(r)
		}, o.fillAliasedCircle = function (n, r, a, i) {
			for (var s = o.context().getImageData(0, 0, e, t), l = a * a, u = Math.max(0, Math.floor(n - a)), c = Math.min(e - 1, Math.ceil(n + a)), d = Math.max(0, Math.floor(r - a)), p = Math.min(t - 1, Math.ceil(r + a)), g = d; p >= g; g++)
				for (var f = u; c >= f; f++)
					if (l >= (f + .5 - n) * (f + .5 - n) + (g + .5 - r) * (g + .5 - r)) {
						var h = 4 * (g * e + f);
						s.data[h + 0] = i[0], s.data[h + 1] = i[1], s.data[h + 2] = i[2], s.data[h + 3] = i[3]
					}
			o.context().putImageData(s, 0, 0)
		}, o
	};
	return o.newMask = function (t, o, n) {
		var a = r(t, o),
			i = null,
			s = null;
		a.clearAll = function () {
			a.context().clearRect(0, 0, t, o), s = null
		}, a.clearSquare = function (e, t, o) {
			u(e, t, o), l(e, t, o)
		}, a.drawBrush = function (e, t, o, n) {
			i = n, d(e, t, o), l(e, t, o)
		}, a.drawSquare = function (e, t, o, n) {
			a.context().fillStyle = n, c(e, t, o), l(e, t, o)
		}, a.drawLine = function (e, t, o, n) {
			a.context().fillStyle = n, p(e, t, o, c), l(e, t, o)
		}, a.drawBrushLine = function (e, t, o, n) {
			i = n, p(e, t, o, d), l(e, t, o)
		}, a.clearLine = function (e, t, o) {
			p(e, t, o, u), l(e, t, o)
		}, a.resetLast = function () {
			l(null, null, null)
		}, a.encode = function () {
			function e(e) {
				var t = 4 * e;
				return 255 & u[t] | (255 & u[t + 1]) << 8 | (255 & u[t + 2]) << 16 | (255 & u[t + 3]) << 24 | 0
			}
			if (null != s) return s;
			for (var r = {}, i = 0; i < n.length; i++) r[0 | n[i]] = i;
			for (var l = a.context().getImageData(0, 0, t, o), u = l.data, c = e(0), d = 0 | r[c], p = 1, g = [], f = u.length / 4, h = 1; f > h; h++) {
				var m = e(h);
				if (c == m) p++;
				else {
					c = m;
					var w = 0 | r[c];
					w == d ? p++ : (g.push("" + d + ":" + p), p = 1, d = w)
				}
			}
			return g.push("" + d + ":" + p), s = g.join(";")
		}, a.decode = function (r) {
			function i(e, t) {
				var o = 4 * e;
				u[o] = 255 & t, u[o + 1] = t >> 8 & 255, u[o + 2] = t >> 16 & 255, u[o + 3] = t >> 24 & 255
			}
			var l = a.context().getImageData(0, 0, t, o),
				u = l.data,
				c = 0;
			e.spliterate(r, ";", function (e) {
				for (var t = e.split(":"), o = 0 | t[0], r = 0 | t[1], a = 0 | n[o], s = 0; r > s; s++, c++) i(c, a)
			}), a.context().putImageData(l, 0, 0), s = null
		};
		var l = function (e, t, o) {
				a.lastX = e, a.lastY = t, a.lastD = o, s = null
			},
			u = function (e, t, o) {
				var n = Math.floor(o / 2);
				a.context().clearRect(e - n, t - n, o, o)
			},
			c = function (e, t, o) {
				var n = Math.floor(o / 2);
				a.context().fillRect(e - n, t - n, o, o)
			},
			d = function (e, t, o) {
				var n = Math.floor(o / 2);
				a.context().drawImage(i, e - n, t - n)
			},
			p = function (e, t, o, n) {
				var r = null == a.lastX ? e : a.lastX,
					i = null == a.lastY ? t : a.lastY,
					s = e - r,
					l = t - i,
					u = Math.abs(s),
					c = Math.abs(l),
					d = Math.max(u, c);
				if (0 == d) n(e, t, o);
				else
					for (var p = 0; d >= p; p++) {
						var g = Math.round(r + p * s / d),
							f = Math.round(i + p * l / d);
						n(g, f, o)
					}
			};
		return a.resetLast(), a
	}, o
}), define("toolmode", ["util", "canvasex", "const"], function (e, t, o) {
	function n(e) {
		for (var o = [], n = 1; n <= window.Globals.MaxBrushDiameter; n++) {
			var r = t.newCanvas(n, n),
				a = n / 2;
			r.fillAliasedCircle(a, a, a, e), o[n - 1] = r
		}
		return o.getBrush = function (e) {
			return o[e - 1]
		}, o
	}
	
	function r(e, t) {
		return a(e, [0, 0, 0], !1, !1, !1, t)
	}
	
	function a(t, r, a, i, l, u) {
		var c = t + "-tool",
			d = "label." + t + "-tool";
		u = u || m;
		var p = {
			key: t,
			cssClass: c,
			buttonSelector: d,
			elements: $(d),
			needsHover: a || i,
			isEraser: a,
			isEyeDropper: l,
			mask: null,
			brushes: null,
			pick: function () {
				v(p)
			},
			getBrush: function (e) {
				return null == p.brushes ? h : p.brushes.getBrush(e)
			},
			drawSquare: a ? function (e, t, o) {
				p.mask && p.mask.clearSquare(e, t, o)
			} : function (e, t, o) {
				p.mask && (window.Globals.UseBrush ? p.mask.drawBrush(e, t, o, p.getBrush(o)) : p.mask.drawSquare(e, t, o, p.cssColor))
			},
			drawLine: a ? function (e, t, o) {
				p.mask && p.mask.clearLine(e, t, o)
			} : function (e, t, o) {
				p.mask && (window.Globals.UseBrush ? p.mask.drawBrushLine(e, t, o, p.getBrush(o)) : p.mask.drawLine(e, t, o, p.cssColor))
			},
			setColor: function (t) {
				p.colorBytesRgba = t, p.cssColor = e.colorBytesToRgbaCss(t), p.abgr32 = e.colorBytesToAbgr32(t), p.rgba32 = e.colorBytesToRgba32(t)
			},
			getCursor: function () {
				return o.ScreenshotMode ? (u.img || (u.img = new Image, u.src || (u.src = t + "-tool-icon.png"), u.img.src = "/assets/images/" + u.src, console.log("ToolMode.getCursor loading cursor", u)), u) : null
			}
		};
		return p.setColor(r), i && (p.brushes = n(p.colorBytesRgba)), s.push(p), p.elements.click(p.pick), p
	}
	
	function i(e) {
		(u != w() || e) && (null != u && (e ? $(".tool-radio-button").removeClass("active") : u.elements.removeClass("active")), u = w(), u.elements.button("toggle"), null != g && g(u))
	}
	var s = [],
		l = {};
	l.PaintHairs = [];
	var u = null,
		c = null,
		d = null,
		p = null,
		g = null,
		f = function () {
			return !0
		},
		h = null,
		m = {
			x: 0,
			y: 0,
			src: "arrow-cursor.png"
		};
	l.setCallbacks = function (e, t) {
		g = e, f = t
	}, l.initialize = function () {
		l.Background = a("red", [255, 0, 0, 255], !1, !0, !1, {
			x: 0,
			y: 0
		}), l.Foreground = a("green", [0, 255, 0, 255], !1, !0, !1, {
			x: 0,
			y: 0
		}), l.MaskEraser = a("erase", [0, 0, 255, 255], !0, !1, !1, {
			x: 0,
			y: 0
		}), l.HairEraser = a("hair-erase", [0, 255, 255, 255], !0, !1, !1, {
			x: 0,
			y: 0
		}), l.ForegroundEyeDropper = a("eyedropper-fg", [128, 0, 255, 255], !1, !1, !0, {
			x: 0,
			y: 13
		}), l.BackgroundEyeDropper = a("eyedropper-bg", [255, 0, 128, 255], !1, !1, !0, {
			x: 0,
			y: 13
		}), l.Grab = r("pan"), l.ResizeTop = r("resize-top"), l.ResizeTopRight = r("resize-top-right"), l.ResizeRight = r("resize-right"), l.ResizeBottomRight = r("resize-bottom-right"), l.ResizeBottom = r("resize-bottom"), l.ResizeBottomLeft = r("resize-bottom-left"), l.ResizeLeft = r("resize-left"), l.ResizeTopLeft = r("resize-top-left"), l.ResizeMove = r("resize-move"), l.Sword = r("sword", {
			x: 1,
			y: 1
		}), l.ShadowArrow = r("shadow-arrow"), l.ShadowEllipse = r("shadow-ellipse", {
			x: 3,
			y: 3,
			src: "shadow-ellipse-tool-cursor.png"
		}), l.ShadowDropMove = r("shadow-drop-move"), l.ShadowDropMove.deselectable = !0;
		for (var e = 0; e < window.Globals.HairColors.length; e++) {
			var o = l["PaintHair" + (e + 1)] = a("hair-" + (e + 1), window.Globals.HairColors[e], !1, !0, !1);
			l.PaintHairs.push(o)
		}
		h = t.newCanvas(1, 1)
	}, l.getSelectedMode = function () {
		return c
	}, l.getVisibleMode = function () {
		return u
	}, l.getTempMode = function () {
		return d
	};
	var w = l.getActiveMode = function () {
			return p || d || c
		},
		v = l.select = function (e) {
			c ? c.key : null;
			c == e && c.deselectable ? (v(l.Grab), setTimeout(i, 0, !0)) : f(e) ? (d = null, c = e, e.mask && e.mask.resetLast(), i()) : setTimeout(i, 0, !0)
		};
	return l.is = function (e) {
		return w() == e
	}, l.isNot = function (e) {
		return w() != e
	}, l.setTempSelect = function (e) {
		d = e, i()
	}, l.releaseTempSelect = function () {
		l.setTempSelect(null)
	}, l.mouseDown = function () {
		p = w()
	}, l.mouseUp = function () {
		p && (p = null, i())
	}, l.forceSelection = function (e, t, o) {
		c = e, d = t, p = o, i()
	}, l
}), define("croprect", ["util"], function () {
	return function (e) {
		function t(t) {
			return e[t] || 0
		}
		e = e || {};
		var o = {
			top0: t("top0"),
			right0: t("right0"),
			bottom0: t("bottom0"),
			left0: t("left0")
		};
		return o.centerX = function () {
			return (o.left0 + o.right0) / 2
		}, o.centerY = function () {
			return (o.top0 + o.bottom0) / 2
		}, o.width = function () {
			return o.right0 - o.left0
		}, o.height = function () {
			return o.bottom0 - o.top0
		}, o.isEmpty = function () {
			return 0 == o.top0 && 0 == o.right0 && 0 == o.bottom0 && 0 == o.left0
		}, o.clear = function () {
			o.top0 = 0, o.right0 = 0, o.bottom0 = 0, o.left0 = 0
		}, o.equals = function (e) {
			return o.top0 == e.top0 && o.right0 == e.right0 && o.bottom0 == e.bottom0 && o.left0 == e.left0
		}, o.softEquals = function (e, t) {
			return t = t || .001, Math.abs(o.top0 - e.top0) < t && Math.abs(o.right0 - e.right0) < t && Math.abs(o.bottom0 - e.bottom0) < t && Math.abs(o.left0 - e.left0) < t
		}, o.setFrom = function (e) {
			o.top0 = e.top0, o.right0 = e.right0, o.bottom0 = e.bottom0, o.left0 = e.left0, o.normalize()
		}, o.normalize = function () {
			var e;
			o.top0 > o.bottom0 && (e = o.top0, o.top0 = o.bottom0, o.bottom0 = e), o.left0 > o.right0 && (e = o.left0, o.left0 = o.right0, o.right0 = e)
		}, o.rotate = function (e, t, n) {
			var r = e * Math.PI / 180,
				a = Math.round(Math.cos(r)),
				i = Math.round(Math.sin(r)),
				s = o.left0 - t,
				l = o.top0 - n,
				u = o.right0 - t,
				c = o.bottom0 - n,
				d = a * s + i * l + t,
				p = -i * s + a * l + n,
				g = a * u + i * c + t,
				f = -i * u + a * c + n;
			o.left0 = Math.min(d, g), o.top0 = Math.min(p, f), o.right0 = Math.max(d, g), o.bottom0 = Math.max(p, f)
		}, o.y2x = function () {
			return o.width() / o.height()
		}, o
	}
}), define("undo", ["util"], function (e) {
	var t = {
			undoStack: [],
			redoStack: [],
			sourceFunction: null,
			stateUpdated: null
		},
		o = 100,
		n = 2e3,
		r = 0;
	return t.push = function (a) {
		a = a || t.sourceFunction(), t.undoStack.push(a), t.undoStack.length > o && t.undoStack.shift(), t.redoStack.length = 0, r = e.currentTimeMillis() + n, t.stateUpdated()
	}, t.undo = function () {
		var e = t.undoStack.pop();
		return t.redoStack.push(t.sourceFunction()), t.stateUpdated(), e
	}, t.redo = function () {
		var e = t.redoStack.pop();
		return t.undoStack.push(t.sourceFunction()), t.stateUpdated(), e
	}, t.canUndo = function () {
		return t.undoStack.length > 0
	}, t.canRedo = function () {
		return t.redoStack.length > 0
	}, t.schedulePush = function () {
		e.currentTimeMillis() > r && t.push()
	}, t
}), define("geometry", ["const"], function () {
	{
		var e = {},
			t = e.newPoint = function (e, o) {
				var n = {
					x: e,
					y: o
				};
				return n.interpolate = function (e, o) {
					return t(n.x * (1 - o) + e.x * o, n.y * (1 - o) + e.y * o)
				}, n.distanceSqrTo = function (e) {
					var t = n.x - e.x,
						o = n.y - e.y;
					return t * t + o * o
				}, n.distanceTo = function (e) {
					return Math.sqrt(n.distanceSqrTo(e))
				}, n.offset = function (e, o) {
					return t(n.x + e, n.y + o)
				}, n.set = function (e) {
					n.x = e.x, n.y = e.y
				}, n.minus = function (e) {
					return t(n.x - e.x, n.y - e.y)
				}, n.times = function (e) {
					return t(e * n.x, e * n.y)
				}, n.ortho = function () {
					return t(o, -e)
				}, n.dot = function (e) {
					return n.x * e.x + n.y * e.y
				}, n.length = function () {
					return Math.sqrt(e * e + o * o)
				}, n.normalize = function () {
					var e = n.length();
					return 0 != e && (n.x /= e, n.y /= e), n
				}, n.dup = function () {
					return t(n.x, n.y)
				}, n.toV = function () {
					return {
						x: n.x,
						y: n.y
					}
				}, n
			};
		e.upgradePoint = function (e) {
			return t(e.x, e.y)
		}
	}
	return e
}), define("sword", ["util", "const", "undo", "geometry"], function (e, t, o, n) {
	function r(e, t) {
		var o = a(e, e.interpolate(t, .5), t);
		return o.isLine = !0, o
	}
	
	function a(e, t, o) {
		function n(e) {
			return B(l.p2.x * e * e + 2 * l.p1.x * (1 - e) * e + l.p0.x * (1 - e) * (1 - e), l.p2.y * e * e + 2 * l.p1.y * (1 - e) * e + l.p0.y * (1 - e) * (1 - e))
		}
		
		function r(e) {
			switch (e) {
				case 0:
					return l.p0;
				case 1:
					return l.mp;
				case 2:
					return l.p2
			}
		}
		
		function a() {
			var e = l.p2.minus(l.p0).ortho().normalize(),
				t = Math.abs(e.dot(l.p1.minus(l.p0)));
			l.isLine = .001 > t && e.length() > 0
		}
		
		function i() {
			l.p1.x = 2 * l.mp.x - .5 * (l.p0.x + l.p2.x), l.p1.y = 2 * l.mp.y - .5 * (l.p0.y + l.p2.y), a()
		}
		
		function s(e, t, o) {
			if (o) {
				var s = r(e),
					u = {
						x: s.x,
						y: s.y
					};
				return o.move(0 == e ? 2 : 0, t), s.set(u), void l.move(e, t)
			}
			var c = 0 == e ? l.p0 : l.p2,
				d = 0 == e ? l.p2 : l.p0;
			switch (e) {
				case 2:
				case 0:
					l.isLine ? (c.set(t), l.p1.set(c.interpolate(d, .5))) : (c.set(t), l.updateP1FromMp()), l.mp.set(n(.5));
					break;
				case 1:
					l.mp.set(t), i()
			}
			a()
		}
		var l = {
			p0: e,
			p1: t,
			p2: o
		};
		return l.move = s, l.updateP1FromMp = i, l.updateIsLine = a, l.getPoint = r, l.eval = n, l.mp = n(.5), a(), l
	}
	
	function i(e) {
		return e.active = !1, e.getFirstPoint = function () {
			return e[0].p0
		}, e.getLastPoint = function () {
			return e[e.length - 1].p2
		}, e.isClosed = function () {
			return e.getFirstPoint() == e.getLastPoint()
		}, e.reverseInPlace = function () {
			for (var t = $.extend(!0, {}, e), o = 0; o < e.length; o++) {
				var n = e[o],
					r = t[e.length - 1 - o];
				n.p0.set(r.p2), n.p1.set(r.p1), n.p2.set(r.p0), n.mp.set(r.mp), n.updateIsLine()
			}
		}, e
	}
	
	function s(e) {
		var t = e.bezier.eval(.25),
			o = e.bezier.eval(.75),
			n = r(e.point, e.bezier.p2);
		e.bezier.mp = t, e.bezier.p2 = e.point, e.bezier.updateP1FromMp(), n.mp = o, n.updateP1FromMp(), e.sword.splice(e.iBezier + 1, 0, n), d()
	}
	
	function l(e, t) {
		0 == e.iPoint && e.sword.reverseInPlace(), 2 == t.iPoint && t.sword.reverseInPlace(), e.sword[e.sword.length - 1].p2 = t.sword[0].p0;
		var o = i(e.sword.concat(t.sword));
		D.splice(e.iSword, 1, o), D.splice(t.iSword, 1), d()
	}
	
	function u(e) {
		switch (o.push(), e.pointType) {
			case "mid":
				var t = e.sword.slice(0, e.iBezier),
					n = e.sword.slice(e.iBezier + 1);
				e.sword.isClosed() ? D[e.iSword] = i(n.concat(t)) : (D.splice(e.iSword, 1), n.length > 0 && D.splice(e.iSword, 0, i(n)), t.length > 0 && D.splice(e.iSword, 0, i(t)));
				break;
			case "interior":
				var r = 0 == e.iPoint ? -1 : 1,
					a = (e.iBezier + r + e.sword.length) % e.sword.length,
					s = e.sword[a];
				e.sword.splice(a, 1), 0 == e.iPoint ? e.bezier.p0 = s.p0 : e.bezier.p2 = s.p2, e.bezier.mp.set(e.point), e.bezier.updateP1FromMp();
				break;
			case "end":
				e.sword.splice(e.iBezier, 1), 0 == e.sword.length && D.splice(e.iSword, 1)
		}
		d()
	}
	
	function c(e, t) {
		var o = U(e),
			n = U(t);
		D.push(i([r(o, n)])), p(D.length - 1, 0, 2, t, T), I.downState = $.extend({}, z), v()
	}
	
	function d() {
		p(-1, -1, -1, {
			x: 0,
			y: 0
		}, T)
	}
	
	function p(e, t, o, n, r) {
		function a() {
			if (1 == o) return "mid";
			var e = z.sword;
			return e.isClosed() || z.point != e.getFirstPoint() && z.point != e.getLastPoint() ? "interior" : "end"
		}
		
		function i() {
			var e = z.point.distanceTo(n),
				t = Math.sqrt(2),
				o = s * t * 1.2;
			switch (z.pointType) {
				case "mid":
					return z.deletePoint = z.point.offset(o, -o), z.plusPoint = z.point.offset(o, o), s >= e ? "move" : z.deletePoint.distanceTo(n) <= s ? "delete" : z.plusPoint.distanceTo(n) <= s ? "plus" : null;
				case "interior":
					return z.deletePoint = z.point.offset(o, -o), s >= e ? "move" : z.deletePoint.distanceTo(n) <= s ? "delete" : null;
				case "end":
					return z.deletePoint = z.point.offset(2 * s * t, 2 * -s * t), s >= e ? "move" : s * A >= e ? "extend" : z.deletePoint.distanceTo(n) <= s ? "delete" : null
			}
		}
		var s = r * R;
		z.iSword = e, z.iBezier = t, z.iPoint = o, z.deletePoint = null, z.plusPoint = null, z.IR_i = s, z.active = e >= 0, z.active ? (z.sword = D[z.iSword], z.bezier = z.sword[z.iBezier], z.point = z.bezier.getPoint(z.iPoint), z.pointType = a(), z.zone = i()) : (z.pointType = null, z.zone = null, z.sword = null, z.bezier = null, z.point = null)
	}
	
	function g(t, o) {
		function n(e) {
			p(i, l, e, t, o)
		}
		var r = e.sqr(o),
			a = r * e.sqr(3.4 / 5);
		if (z.active && z.point.distanceSqrTo(t) < ("end" == z.pointType ? r : a)) return void p(z.iSword, z.iBezier, z.iPoint, t, o);
		for (var i = D.length - 1; i >= 0; i--)
			for (var s = D[i], l = s.length - 1; l >= 0; l--) {
				var u = s[l],
					c = l == s.length - 1,
					g = 0 == l;
				if (u.p2.distanceSqrTo(t) < (c ? r : a)) return n(2);
				if (u.mp.distanceSqrTo(t) < a) return n(1);
				if (u.p0.distanceSqrTo(t) < (g ? r : a)) return n(0)
			}
		d()
	}
	
	function f(t, o) {
		function n(e, o, n) {
			var u = D[e][o].getPoint(n),
				c = u.distanceSqrTo(t);
			u != a.point && r > c && (i = e, s = o, l = n, r = c)
		}
		var r = e.sqr(.6 * o),
			a = I.downState,
			i = -1,
			s = -1,
			l = -1;
		if (a)
			for (var u = D.length - 1; u >= 0; u--)
				if (u != a.iSword) {
					var c = D[u];
					c.isClosed() || (n(u, 0, 0), n(u, c.length - 1, 2))
				}
		p(i, s, l, t, o), z.zone = "snap"
	}
	
	function h() {
		var e = I.downState,
			t = z;
		return e && e.active && ("move" == e.zone || "extend" == e.zone) && "end" == e.pointType && "end" == t.pointType && e.sword != t.sword && e.bezier != t.bezier && e.point != t.point
	}
	
	function m() {
		I.v0 = null, I.v2 = null, I.downState = null, I.firstMove = !0
	}
	
	function w() {
		P && (P = !1, E = 0 | M.swordUpdated())
	}
	
	function v() {
		F = null, P = !0
	}
	
	function b(t) {
		return e.clamp(x * Math.log(t), 4, 8)
	}
	
	function y(e) {
		return b(e) * C
	}
	
	function S(e) {
		return b(e) / e
	}
	
	function k(e) {
		return y(e) / e
	}
	var M = {},
		C = 5,
		R = 1 / C,
		x = 6,
		T = x * C,
		A = 3,
		D = [],
		I = {
			v0: null,
			v2: null,
			downState: null
		},
		z = {
			iSword: -1,
			iBezier: -1,
			iPoint: -1,
			zone: null,
			pointType: null,
			active: !1,
			sword: null,
			bezier: null,
			point: null
		},
		F = null,
		P = !1,
		E = 0,
		B = n.newPoint,
		U = n.upgradePoint;
	return M.mouseDown = function (e) {
		m(), I.v0 = e, I.downState = $.extend({}, z)
	}, M.mouseWheel = function (e, t) {
		M.mouseMove(e, t)
	}, M.mouseMove = function (e, t) {
		var n = k(t),
			a = I.downState;
		if (a) {
			if ("move" == a.zone ? f(e, n) : g(e, n), I.v2 = h() ? z.point : e, a.active) {
				if ("move" == a.zone) {
					switch (a.pointType) {
						case "mid":
							I.firstMove && o.push(), a.bezier.move(a.iPoint, I.v2);
							break;
						case "interior":
							var i = (a.iBezier + (0 == a.iPoint ? -1 : 1) + a.sword.length) % a.sword.length;
							a.bezier.move(a.iPoint, I.v2, a.sword[i]);
							break;
						case "end":
							I.firstMove && o.push(), a.bezier.move(a.iPoint, I.v2)
					}
					a.sword.active = !1, v()
				} else if ("extend" == a.zone) {
					if (I.firstMove && o.push(), 0 == a.iPoint) {
						var s = U(I.v2),
							l = a.point;
						a.sword.unshift(r(s, l)), p(a.iSword, 0, 0, I.v0, T)
					} else {
						var s = a.point,
							l = U(I.v2);
						a.sword.push(r(s, l)), p(a.iSword, a.sword.length - 1, 2, I.v2, T)
					}
					a.sword.active = !1, I.downState = $.extend({}, z), v()
				}
			} else I.v0 && I.v2 && (I.firstMove && o.push(), c(I.v0, I.v2), v());
			I.firstMove = !1
		} else g(e, n)
	}, M.mouseUp = function () {
		var e = I.downState,
			t = z;
		e && t.zone == e.zone && e.point == t.point && ("delete" == e.zone ? (o.push(), u(e), e.sword.active = !1, v()) : "plus" == e.zone && (o.push(), s(e), e.sword.active = !1, v())), h() && (l(e, t), v()), m(), w()
	}, M.clear = function () {
		D.length > 0 && (D.length = 0, v(), w())
	}, M.encode = function () {
		function e(e) {
			var o = t.indexOf(e);
			return 0 > o && (t.push(e), F.points.push({
				x: e.x,
				y: e.y
			}), o = F.points.length - 1), o
		}
		if (null != F) return F;
		F = {
			points: [],
			swords: []
		};
		for (var t = [], o = 0; o < D.length; o++) {
			var n = D[o],
				r = [];
			F.swords.push(r);
			for (var a = 0; a < n.length; a++) {
				var i = n[a];
				r.push([e(i.p0), e(i.p1), e(i.p2)])
			}
		}
		return F
	}, M.decode = function (e) {
		var t, o;
		console.log("Sword.decode", e), F = e, D.length = 0;
		try {
			if (e && e.swords) {
				var n = [];
				for (t = 0; t < e.points.length; t++) n.push(U(e.points[t]));
				var r = e.swords;
				for (t = 0; t < r.length; t++) {
					var s = r[t],
						l = [];
					for (o = 0; o < s.length; o++) {
						var u = s[o];
						l.push(a(n[u[0]], n[u[1]], n[u[2]]))
					}
					l.length > 0 && D.push(i(l))
				}
			}
		} catch (c) {
			console.log("Failed to decode sword", c)
		}
		d()
	}, M.setActiveSwords = function (e, t) {
		if (t >= E && !P && e.length == D.length)
			for (var o = 0; o < D.length; o++) D[o].active = !!e[o]
	}, M.hasSomeSwords = function () {
		return D.length > 0
	}, M.computeInnerRadius_c = b, M.computeOuterRadius_c = y, M.computeInnerRadius_i = S, M.computeOuterRadius_i = k, M.swordUpdated = e.empty, M.mouseCancel = m, M.newBezier = a, M.newPoint = B, M.swords = D, M.inProgress = I, M.hoverState = z, M.ExtendMultiplier = A, M
}), define("webapi", ["const"], function () {
	function e(e, t) {
		if (0 === e.status) return "Failed to connect to the server.\nPlease verify your network connection.\nServer may be down - try reloading the page.";
		if (e.status) {
			var o = r[e.status];
			if (o) return o + ". [" + e.status + "]"
		}
		return "parsererror" === t ? "Failed to parse JSON response. [" + t + "]" : "timeout" === t ? "Request time out. [" + t + "]" : "abort" === t ? "Request aborted by the server. [" + t + "]" : "Uncaught Error.\n" + e.responseText.toString().substring(0, 200)
	}
	
	function t(t) {
		return function (o, n) {
			t(e(o, n))
		}
	}
	
	function o(e, t) {
		return function (o) {
			o.error ? e(o.error) : t(o)
		}
	}
	var n = {},
		r = {
			400: "Bad Request",
			401: "Unauthorised",
			403: "Forbidden",
			404: "Not Found",
			405: "Method Not Allowed",
			406: "Not Acceptable",
			407: "Proxy Authentication Required",
			408: "Request Timeout",
			413: "Request Entity Too Large",
			414: "Request-URI Too Long",
			500: "Internal Server Error",
			502: "Bad Gateway",
			503: "Service Unavailable",
			504: "Gateway Timeout"
		};
	n.createUserImageSpec = function (e, n, r, a) {
		$.ajax("/api/images", {
			cache: !1,
			data: {
				originalFilename: e.name,
				contentType: e.type,
				w: n.width,
				h: n.height,
				sizePixels: n.width * n.height,
				sizeBytes: e.size
			},
			dataType: "json",
			error: t(r),
			success: o(r, a),
			type: "POST"
		})
	}, n.readUserImageSpec = function (e, n, r, a) {
		$.ajax("/api/images/" + e + "/" + n, {
			cache: !1,
			dataType: "json",
			error: t(r),
			success: o(r, a),
			type: "GET"
		})
	}, n.updateMetaData = function (e, n, r, a, i) {
		$.ajax("/api/images/" + e + "/" + n, {
			cache: !1,
			data: r,
			dataType: "json",
			error: t(a),
			success: o(a, i),
			type: "POST"
		})
	}, n.listImages = function (e, n, r, a, i, s) {
		$.ajax("/api/images", {
			cache: !1,
			data: {
				minId: e,
				maxId: n,
				forClipping: r,
				s: a
			},
			dataType: "json",
			error: t(i),
			success: o(i, s),
			type: "GET"
		})
	}, n.listImagesEx = function (e, n, r, a, i, s) {
		console.log("WebApi.listImagesEx", e, n, r, a), $.ajax("/api/imagesEx/" + e, {
			cache: !1,
			data: {
				minId: n,
				maxId: r,
				ids: a
			},
			dataType: "json",
			error: t(i),
			success: o(i, s),
			type: "GET"
		})
	}, n.setStickySettings = function (e, n, r) {
		$.ajax("/api/setStickySettings?stickySettings=" + encodeURIComponent(e), {
			cache: !1,
			data: {},
			dataType: "json",
			error: t(n),
			success: o(n, r),
			type: "POST"
		})
	};
	var a = 0;
	return n.getNextWorkerUrl = function () {
		return window.Globals.WorkerUrls[a++ % window.Globals.WorkerUrls.length]
	}, n
}), define("workerapi", ["webapi", "util", "retrydialog", "const"], function (e, t, o, n) {
	function r() {
		if (null != f && f.readyState == WebSocket.OPEN) {
			var e = {
				command: n.StatusCheck
			};
			f.send(JSON.stringify(e))
		}
	}
	
	function a(e) {
		console.log("WorkerApi.createWebSocket", e), f = new WebSocket(e), f.binaryType = "arraybuffer", f.onopen = i, f.onclose = s, f.onmessage = u
	}
	
	function i() {
		console.log("CONNECTED"), t.gaTrack("WebSocket", v, "connected", 1), w = -1, r()
	}
	
	function s(e) {
		if (console.log("DISCONNECTED", e.wasClean, e.code, e.reason), e.reason) switch (console.log("onClose got reason", e.reason), e.reason) {
			case "2":
				return l("Unknown image - it may have been deleted, or you may not have the necessary credentials to access it");
			case "-3":
				return l("Workers overloaded. Additional workers are being spawned - they should be online in a couple of minutes. ");
			case "-4":
				break;
			default:
				return l(e.reason)
		} else if (!m) return l("Unable to connect to the worker. Is your firewall or proxy blocking WebSockets?");
		y.trying = !1, y.pending = !1, f = null, c.isConnected = !1, g.disconnectedFromServer(y)
	}
	
	function l(e) {
		console.log("ERROR", e, arguments, y.tries), t.gaTrack("WebSocket", v, "error", 0), y.pending = !1, y.err = e, y.tries < g.tries ? setTimeout(y.retryNow, d) : g.failedToConnect(y)
	}
	
	function u(e) {
		if ("string" == typeof e.data) {
			var t = JSON.parse(e.data);
			m || (m = !0, b = y.tries, y.tries = 0, y.trying = !1, y.pending = !1, c.isConnected = !0, g.connectedToNewServer(y)), null != h && (t.arraybuffer = h, h = null), g.newMessageFromServer(t)
		} else h = e.data
	}
	var c = {};
	c.isConnected = !1;
	var d = 500,
		p = {
			imageId: -1,
			secret: "unknown",
			newMessageFromServer: t.empty,
			connectedToNewServer: t.empty,
			disconnectedFromServer: t.empty,
			failedToConnect: t.empty,
			tries: 2
		},
		g = {},
		f = null,
		h = null,
		m = !1,
		w = -1,
		v = "",
		b = 0,
		y = o.createRetryable("Connect to worker", function () {
			m = !1, c.isConnected = !1, y.trying = !0, y.tries += 1, v = e.getNextWorkerUrl(), a(v + "/api/websocket?imageId=" + g.imageId + "&secret=" + g.secret)
		});
	c.initialize = function (e) {
		console.log("WorkerApi.initialize"), g = $.extend({}, p, e), g.lastActivityAt = t.currentTimeMillis(), y.retryNow(), setInterval(r, 2e4)
	}, c.disconnectError = function () {
		y.tries = b, l("Unexpected worker disconnection. Should be temporary - keep trying. ")
	};
	c.send = function (e) {
		if (g.lastActivityAt = t.currentTimeMillis(), null == f || f.readyState != WebSocket.OPEN) return null != f || y.trying || y.retryNow(), console.log("WorkerApi.send dropping", e), !1;
		try {
			f.send(JSON.stringify(e))
		} catch (o) {
			return console.log("WorkerApi.send failed", e, o), f = null, y.trying || y.retryNow(), !1
		}
		return !0
	}, c.close = function () {
		null != f && (f.close(), f = null)
	};
	return c
}), define("viewport", ["util", "canvasex", "toolmode", "const", "croprect", "sword", "workerapi"], function (e, t, o, n, r, a, i) {
	function s() {
		function s() {
			return (new Date).getTime()
		}
		
		function C() {
			if (1 == X()) return st[0];
			for (var e = K.canvasDiv.outerWidth(), o = K.canvasDiv.outerHeight(), n = t.newCanvas(e, o), r = n.context(), a = 0, i = 0; a < st.length; a++) {
				var s = st[a];
				s.config.isVisible && (r.drawImage(s, s.left, s.top, s.width, s.height), i++)
			}
			return n
		}
		
		function R() {
			var e = C();
			i.send({
				command: "ScreenShot",
				index: -1,
				screenShot: e.toDataURL("png")
			})
		}
		
		function x(e) {
			o.mouseDown(), j(), At = e.currentTarget, Xt = e.pageX, Yt = e.pageY, jt = pt, Zt = gt, Ot = !0, Ht = e.which, $(window).on("mouseup", T), $(window).on("mousemove", z), L(e, e.currentTarget), qt = Rt, Vt = xt, Jt.mouseDownHandler(e), oo()
		}
		
		function T(e) {
			o.mouseUp(), j(), Ot = !1, $(window).off("mouseup", T), $(window).off("mousemove", z), Jt.mouseUpHandler(e), At = null, oo()
		}
		
		function A(e) {
			L(e, e.currentTarget)
		}
		
		function D() {
			o.is(o.Grab) && io()
		}
		
		function I(e) {
			null == At && F(e), J.mouseIsOver = !0
		}
		
		function z(e) {
			F(e)
		}
		
		function F(e) {
			if (L(e, At || e.currentTarget), Jt.mouseMoveHandler(e), Ot && (j(), o.is(o.Grab))) {
				var t = jt - (e.pageX - Xt) / ft,
					n = Zt - (e.pageY - Yt) / ft;
				no(t, n, null)
			}
			oo()
		}
		
		function P(e, t) {
			if (!Ot) {
				j();
				var o = t > 0 ? 1.2 : 0 > t ? 1 / 1.2 : 1;
				L(e, e.currentTarget), W(Dt, It, o), L(e, e.currentTarget), Jt.mouseWheelHandler(e, t), oo()
			}
			return !1
		}
		
		function E(e) {
			e.currentTarget.config.panModeOnly && !Wt && (Wt = !0, U()), J.mouseIsOver = !0
		}
		
		function B(e) {
			e.currentTarget.config.panModeOnly && Wt && (Wt = !1, U()), Rt = xt = $t = Tt = Ct, J.mouseIsOver = !1, oo()
		}
		
		function U() {
			Nt || Wt ? o.setTempSelect(o.Grab) : o.releaseTempSelect()
		}
		
		function L(e, t) {
			if (null != t) {
				var o = k.totalRotationAngleRad();
				if (null != e) {
					var n = $(t).offset();
					Dt = e.pageX - n.left, It = e.pageY - n.top
				}
				zt = (Dt - t.width / 2) / ft + pt, Ft = (It - t.height / 2) / ft + gt;
				var r = zt - ct,
					a = Ft - dt;
				Rt = r * Math.cos(o) - a * Math.sin(o) + ct, xt = r * Math.sin(o) + a * Math.cos(o) + dt, $t = Math.floor(Rt), Tt = Math.floor(xt), G(t), Kt = t
			}
		}
		
		function G(e) {
			Pt = Math.round(e.width / 2 - pt * ft), Et = Math.round(e.height / 2 - gt * ft), Bt = Math.round(lt * ft), Ut = Math.round(ut * ft), Lt = Pt + Bt / 2, Gt = Et + Ut / 2;
			var t = k.getCrop_o();
			_t.left0 = Math.floor(Qt(t.left0)), _t.right0 = Math.ceil(Qt(t.right0)), _t.top0 = Math.floor(eo(t.top0)), _t.bottom0 = Math.ceil(eo(t.bottom0))
		}
		
		function _(e) {
			q(-(e ? 1 : tt) / ft, 0, 1)
		}
		
		function O(e) {
			q((e ? 1 : tt) / ft, 0, 1)
		}
		
		function H(e) {
			q(0, -(e ? 1 : tt) / ft, 1)
		}
		
		function N(e) {
			q(0, (e ? 1 : tt) / ft, 1)
		}
		
		function W(e, t, o) {
			Y(e, t, ft * o)
		}
		
		function X() {
			for (var e = 0, t = 0; t < st.length; t++) st[t].config.isVisible && e++;
			return e
		}
		
		function Y(t, o, n) {
			if (n !== ft) {
				n = e.clamp(n, it, at);
				var r = t - st[0].width / 2,
					a = o - st[0].height / 2,
					i = pt + r / ft - r / n,
					s = gt + a / ft - a / n;
				no(i, s, n)
			}
		}
		
		function q(e, t, o) {
			mt = pt, wt = gt, vt = ft, kt = s(), null == Mt && (bt = pt, yt = gt, St = ft, Mt = setInterval(V, Q)), bt += e, yt += t, St *= o
		}
		
		function V() {
			var t = s(),
				o = (t - kt) / et,
				n = e.clamp(o, 0, 1),
				r = mt + n * (bt - mt),
				a = wt + n * (yt - wt),
				i = Math.exp(Math.log(vt) + n * (Math.log(St) - Math.log(vt)));
			n >= 1 && j(!0), no(r, a, i, !1, $t == Ct)
		}
		
		function j(e) {
			void 0 === e && (e = !1), (e || !ht) && (window.clearInterval(Mt), mt = null, wt = null, vt = null, bt = null, yt = null, St = null, kt = null, Mt = null, ht = !1)
		}
		
		function Z(t) {
			function r(e, t, o, n, r) {
				A.clip ? (T.save(), T.beginPath(), T.rect(e, t, o - e, n - t), T.clip(), r(), T.restore()) : r()
			}
			
			function i(e, t) {
				T.globalAlpha = t, T.drawImage(e, 0, 0, lt, ut, Pt, Et, Bt, Ut)
			}
			
			function s(e, t, o, n) {
				if (e) {
					T.globalAlpha = t;
					var r = e.width,
						a = e.height;
					T.drawImage(e, 0, 0, r, a, Pt + o * ft, Et + n * ft, Math.round(r * ft), Math.round(a * ft))
				}
			}
			
			function C(e, t) {
				0 != e && (T.save(), T.translate(Lt, Gt), T.rotate(e), T.translate(-Lt, -Gt)), t(), 0 != e && T.restore()
			}
			
			function R(e, t) {
				T.strokeStyle = e, T.lineWidth = t, T.stroke()
			}
			
			function x(o, n) {
				var r = o;
				T.globalAlpha = 1, T.font = "bold 18px 'Helvetica Neue', Helvetica, Arial, sans-serif";
				var a = T.measureText(o).width,
					i = t.width - 20;
				a > i && (T.font = "bold 12px 'Helvetica Neue', Helvetica, Arial, sans-serif", a = T.measureText(o).width, a > i && (o = e.centerElide(r, 50, 46), a = T.measureText(o).width, a > i && (o = e.centerElide(r, 30, 26), a = T.measureText(o).width, a > i && (o = e.centerElide(r, 20, 16), a = T.measureText(o).width))));
				var s = (t.width - a) / 2;
				T.strokeStyle = "#FFFFFF", T.lineWidth = 3, T.lineJoin = "bevel", T.strokeText(o, s, n), T.fillStyle = "#444444", T.fillText(o, s, n)
			}
			
			function $(e, t, o, n) {
				T.beginPath(), T.moveTo(Math.floor(e) + .5, Math.floor(t) + .5), T.lineTo(Math.floor(o) + .5, Math.floor(n) + .5), T.stroke()
			}
			if (t && J.showing) {
				var T = t.context(),
					A = t.config;
				if (T.globalAlpha = 1, T.clearRect(0, 0, t.width, t.height), e.imageIsReady(K.image)) {
					G(t), T.fillStyle = T.createPattern(S, "repeat"), T.fillRect(0, 0, t.width, t.height), T.globalAlpha = 1, A.showBackground && k.settings.backgroundColor && "" != k.settings.backgroundColor && k.settings.backgroundColor != window.Globals.BackgroundColors[0] && (T.fillStyle = k.settings.backgroundColor, T.fillRect(_t.left0, _t.top0, _t.width(), _t.height()));
					var D = J.getCrop_c();
					if (r(D.left0, D.top0, D.right0, D.bottom0, function () {
							C(-k.totalRotationAngleRad(), function () {
								function e(e, t) {
									T.globalAlpha = t ? .25 : .125;
									var o = P * a.ExtendMultiplier,
										n = Qt(e.x),
										r = eo(e.y);
									T.fillCircle(n, r, o, "#FFFFFF"), R("#000000", E)
								}
								
								function r(e, t) {
									T.globalAlpha = 1;
									var o = P,
										n = .8 * o / Math.sqrt(2),
										r = Qt(e.x),
										a = eo(e.y);
									T.fillCircle(r, a, o, t ? c : d), T.beginPath(), T.moveTo(r - n, a - n), T.lineTo(r + n, a + n), T.moveTo(r - n, a + n), T.lineTo(r + n, a - n), R(t ? "#FFFFFF" : "#DDDDDD", E)
								}
								
								function S(e, t) {
									T.globalAlpha = 1;
									var o = P,
										n = .8 * o,
										r = Qt(e.x),
										a = eo(e.y);
									T.fillCircle(r, a, o, t ? l : u), T.beginPath(), T.moveTo(r - n, a), T.lineTo(r + n, a), T.moveTo(r, a + n), T.lineTo(r, a - n), R(t ? "#FFFFFF" : "#DDDDDD", E)
								}
								
								function C(e, t) {
									T.globalAlpha = 1, T.fillCircle(Qt(e.x), eo(e.y), P, "#000000"), T.fillCircle(Qt(e.x), eo(e.y), P - 1, t)
								}
								
								function x(e, t) {
									T.globalAlpha = 1, T.beginPath(), T.moveTo(Qt(e.p0.x), eo(e.p0.y)), e.isLine ? T.lineTo(Qt(e.p2.x), eo(e.p2.y)) : T.quadraticCurveTo(Qt(e.p1.x), eo(e.p1.y), Qt(e.p2.x), eo(e.p2.y)), R("#000000", n.LineOuterWidth), R(t, n.LineInnerWidth)
								}
								
								function $(e) {
									return e.active ? b : y
								}
								
								function D(e) {
									return e.active ? f : g
								}
								if (A.showPreview && M.ShadowApp && M.ShadowApp.drawUnder_i(t, T, J, s), A.showOriginal && i(K.image, 1), A.showPreview && i(k.previewCanvas, 1), A.showUserMask && i(k.userMask, Globals.ClientMaskAlphaFloat), A.showHairMask && i(k.hairMask, Globals.ClientMaskAlphaFloat), A.showBeziers) {
									T.globalAlpha = 1, T.lineJoin = "bevel";
									for (var I = 0; I < k.bezierSet.length; I++) {
										var z = k.bezierSet[I];
										T.beginPath(), T.moveTo(Qt(z[0]), eo(z[1]));
										for (var F = 2; F < z.length; F += 4) T.quadraticCurveTo(Qt(z[F]), eo(z[F + 1]), Qt(z[F + 2]), eo(z[F + 3]));
										R("#000000", n.LineOuterWidth), R("#FFFF66", n.LineInnerWidth)
									}
									var I, z, F
								}
								if (A.showSword) {
									for (var P = a.computeInnerRadius_c(ft), E = P / 3, I = 0; I < a.swords.length; I++) {
										var B = a.swords[I];
										T.globalAlpha = 1, T.beginPath(), T.moveTo(Qt(B[0].p0.x), eo(B[0].p0.y));
										for (var U = 0; U < B.length; U++) {
											var z = B[U];
											z.isLine ? T.lineTo(Qt(z.p2.x), eo(z.p2.y)) : T.quadraticCurveTo(Qt(z.p1.x), eo(z.p1.y), Qt(z.p2.x), eo(z.p2.y))
										}
										R("#000000", n.LineOuterWidth), R(B.active ? m : h, n.LineInnerWidth)
									}
									if (o.getSelectedMode() == o.Sword)
										for (var I = 0; I < a.swords.length; I++)
											for (var B = a.swords[I], L = $(B), G = D(B), U = 0; U < B.length; U++) {
												var z = B[U];
												C(z.p0, L), C(z.p2, L), C(z.mp, G)
											}
									if (o.getActiveMode() == o.Sword) {
										var _ = a.hoverState;
										if (_.active) {
											var O = "move" == _.zone,
												H = O ? p : _.sword.active ? v : w,
												N = "delete" == _.zone,
												W = "plus" == _.zone,
												X = "extend" == _.zone;
											switch (_.pointType) {
												case "mid":
													N ? (x(_.bezier, c), C(_.bezier.p0, 0 == _.iBezier ? c : $(_.sword)), C(_.bezier.p2, _.iBezier == _.sword.length - 1 ? c : $(_.sword))) : W && (C(_.bezier.eval(.25), l), C(_.bezier.eval(.75), l)), C(_.point, N ? c : H), r(_.deletePoint, N), S(_.plusPoint, W);
													break;
												case "end":
													if (N) {
														x(_.bezier, c), C(_.bezier.mp, c);
														var Y = _.bezier.getPoint(0 == _.iPoint ? 2 : 0);
														C(Y, 1 == _.sword.length ? c : $(_.sword))
													} else X && (T.globalAlpha = 1, T.beginPath(), T.moveTo(Qt(_.point.x), eo(_.point.y)), T.lineTo(Qt(Rt), eo(xt)), R("#000000", n.LineOuterWidth), R(l, n.LineInnerWidth));
													e(_.point, X), C(_.point, N ? c : H), r(_.deletePoint, N);
													break;
												case "interior":
													if (N) {
														var q = _.sword[_.iBezier + (0 == _.iPoint ? -1 : 1)];
														x(q, c), x(_.bezier, c), C(_.bezier.mp, c), C(q.mp, c);
														var V = a.newBezier(q.getPoint(_.iPoint), a.newPoint(0, 0), _.bezier.getPoint(0 == _.iPoint ? 2 : 0));
														V.mp.set(_.point), V.updateP1FromMp(), x(V, l), C(V.p0, $(_.sword)), C(V.mp, D(_.sword)), C(V.p2, $(_.sword))
													}
													C(_.point, H), r(_.deletePoint, N)
											}
										}
										var j = a.inProgress.downState;
										j && j.point && "move" == j.zone && C(j.point, p)
									}
								}
								if (A.showEyeDropperLoupe && o.getActiveMode().isEyeDropper && Kt == t || A.showHairEraserLoupe && o.getActiveMode() == o.HairEraser && Kt == t) {
									T.globalAlpha = 1;
									var Z = Math.round(n.LoupeRadius / ft),
										Q = Math.max(0, $t - Z),
										et = Math.min(lt, $t + Z) - Q,
										tt = Math.max(0, Tt - Z),
										ot = Math.min(ut, Tt + Z) - tt;
									ot > 0 && et > 0 && (T.drawImage(K.image, Q, tt, et, ot, Qt(Q), eo(tt), et * ft, ot * ft), T.beginPath(), T.rect(Qt(Q), eo(tt), et * ft, ot * ft), R("#FFFF66", 2))
								}
								if (o.isNot(o.Grab) && A.showHoverTool) {
									var nt = o.getActiveMode();
									if (nt.needsHover) {
										T.globalAlpha = .4, T.fillStyle = nt.cssColor;
										var rt = to(),
											at = Math.floor(rt / 2),
											it = rt - at,
											st = Math.round(Pt + ($t - at) * ft),
											ct = Math.round(Et + (Tt - at) * ft),
											dt = Math.round(Pt + ($t + it) * ft),
											pt = Math.round(Et + (Tt + it) * ft);
										if (!window.Globals.UseBrush || nt.isEraser) T.fillRect(st, ct, dt - st, pt - ct);
										else {
											var gt = nt.getBrush(rt);
											T.drawImage(gt, st, ct, dt - st, pt - ct)
										}
									}
								}
								Jt.drawOver_i(t, T)
							})
						}), (A.showFrame || 0 != k.settings.straightenAngleDeg) && (T.strokeStyle = "#000000", T.globalAlpha = .4, T.lineWidth = 1, T.strokeRect(_t.left0 + .5, _t.top0 + .5, _t.width() - 1, _t.height() - 1)), Jt.drawOver_c(t, T), A.title && !n.ScreenshotMode && x(A.title, 20), A.filename && !n.ScreenshotMode && x(A.filename, t.height - 20), K.showGrid && K.showGrid()) {
						T.globalAlpha = .4, T.strokeStyle = "#000000", T.lineWidth = 1;
						for (var I = t.width, z = t.height, F = 100, P = 0; I / 2 > P; P += F) $(I / 2 + P, 0, I / 2 + P, z), $(I / 2 - P, 0, I / 2 - P, z);
						for (var E = 0; z / 2 > E; E += F) $(0, z / 2 + E, I, z / 2 + E), $(0, z / 2 - E, I, z / 2 - E)
					}
					var B = t.height,
						U = "#222",
						L = "#777",
						_ = "#bbb",
						O = 1,
						H = 1;
					if (T.globalAlpha = 1, A.borderLeft && (T.fillStyle = L, T.fillRect(0, 0, H, B), T.fillStyle = U, T.fillRect(H, 0, O, B)), A.borderRight) {
						var N = t.width - O - H;
						T.fillStyle = L, T.fillRect(N + O, 0, H, B), T.fillStyle = _, T.fillRect(N, 0, O, B)
					}
					if (n.ScreenshotMode && (A.showHoverTool || 1 == st.length)) {
						var W = o.getActiveMode().getCursor();
						W && (T.globalAlpha = 1, T.drawImage(W.img, Dt - W.x, It - W.y))
					}
				}
			}
		}
		var J = {},
			K = null,
			Q = 10,
			et = 100,
			tt = 50,
			ot = 1.2,
			nt = 1 / ot,
			rt = .9,
			at = 64,
			it = 1 / 16,
			st = null,
			lt = null,
			ut = null,
			ct = 0,
			dt = 0,
			pt = null,
			gt = null,
			ft = null,
			ht = !1,
			mt = null,
			wt = null,
			vt = null,
			bt = null,
			yt = null,
			St = null,
			kt = null,
			Mt = null,
			Ct = -1e4,
			Rt = Ct,
			xt = Ct,
			$t = Ct,
			Tt = Ct,
			At = null,
			Dt = 0,
			It = 0,
			zt = 0,
			Ft = 0,
			Pt = 0,
			Et = 0,
			Bt = 0,
			Ut = 0,
			Lt = 0,
			Gt = 0,
			_t = r(),
			Ot = !1,
			Ht = null,
			Nt = !1,
			Wt = !1,
			Xt = null,
			Yt = null,
			qt = null,
			Vt = null,
			jt = null,
			Zt = null,
			Jt = null,
			Kt = null;
		J.repeaterDelay = et / 2, J.showing = !1, J.mouseIsOver = !1, J.initialize = function (e) {
			K = e, lt = K.image.width, ut = K.image.height, ct = lt / 2, dt = ut / 2, pt = lt / 2, gt = ut / 2, Jt = K.app, ft = 1, st = [];
			for (var o = 0; o < K.viewConfigs.length; o++) {
				var n = t.newCanvas(1, 1);
				n.config = K.viewConfigs[o], st[o] = n, K.canvasDiv.append(n), $(n).mousedown(x).mouseup(T).mousemove(I).hover(E, B).click(A).dblclick(D).on("mousewheel", P)
			}
			J.canvases = st, Kt = st[0], st.length >= 2 && (st[1].toDataURL = function (e) {
				return st[0].toDataURL(e)
			}, $(st[1]).on("contextmenu", function (e) {
				return e.preventDefault(), !1
			})), $(window).resize(lo)
		}, J.setViewConfigAndShow = function (e, t) {
			Jt = t, st[0].config = e, lo(), so(!0), J.showing = !0, oo()
		}, J.keyDownHandler = function (e) {
			switch (e.keyCode) {
				case 16:
					return Nt || (Nt = !0, U()), !0;
				case 37:
					return _(e.shiftKey), !0;
				case 38:
					return H(e.shiftKey), !0;
				case 39:
					return O(e.shiftKey), !0;
				case 40:
					return N(e.shiftKey), !0;
				case 33:
					return ro(), !0;
				case 34:
					return ao(), !0;
				case 36:
					return io(), !0;
				case 89:
					k.tryRedo();
					break;
				case 90:
					e.shiftKey ? k.tryRedo() : k.tryUndo();
					break;
				case 81:
					n.ScreenshotMode && R();
					break;
				case 87:
					if (n.ScreenshotMode) {
						var t = K.canvasDiv;
						t.css("620px" == t.css("width") ? {
							width: "auto",
							height: "auto"
						} : {
							width: "620px",
							height: "200px"
						}), J.updateSize()
					}
			}
			return !1
		}, J.keyUpHandler = function (e) {
			switch (e.keyCode) {
				case 16:
					return Nt && (Nt = !1, U()), !0
			}
			return !1
		}, J.releaseTempSelectIfMouseNotDown = function () {
			Ot || o.releaseTempSelect()
		};
		var Qt = J.o2cX = function (e) {
				return Pt + e * ft
			},
			eo = J.o2cY = function (e) {
				return Et + e * ft
			};
		J.getCrop_c = function () {
			return _t
		}, J.getMouse_c = function () {
			return {
				x: Dt,
				y: It
			}
		}, J.getClick_c = function () {
			return {
				x: Xt,
				y: Yt
			}
		}, J.getClick_i = function () {
			return {
				x: qt,
				y: Vt
			}
		}, J.getMouse_i = function () {
			return {
				x: Rt,
				y: xt
			}
		}, J.getMouse_ii = function () {
			return {
				x: $t,
				y: Tt
			}
		}, J.getMouseIsDown = function () {
			return Ot
		}, J.getZoomScale = function () {
			return ft
		}, J.getShiftIsDown = function () {
			return Nt
		};
		var to = J.diameter = function () {
				return e.clamp(Math.floor(window.Globals.BrushSize / ft), 1, window.Globals.MaxBrushDiameter)
			},
			oo = J.refreshAllViews = function () {
				if (st)
					for (var e = 0; e < st.length; e++) st[e].config.isVisible && Z(st[e])
			};
		J.rotationCropUpdated = function () {
			no(pt, gt, ft, !0)
		};
		var no = J.setView = function (t, o, r, a, i) {
			null == r && (r = ft);
			var s = k.getCrop_o(),
				l = e.clamp(t, s.left0, s.right0),
				u = e.clamp(o, s.top0, s.bottom0),
				c = e.clamp(r, it, at);
			(l != pt || u != gt || c != ft) && (pt = l, gt = u, ft = c, i || L(null, Kt), a || oo(), n.ScreenshotMode && $("#viewport-setting").val(J.toString()))
		};
		J.toString = function () {
			return "" + pt + "," + gt + "," + ft
		}, J.fromString = function (e) {
			try {
				var t = e.split(",");
				no(parseFloat(t[0]), parseFloat(t[1]), parseFloat(t[2]))
			} catch (o) {
				console.log("Viewport.fromString", e, o)
			}
		};
		var ro = J.animateZoomInAboutCenter = function () {
				q(0, 0, ot)
			},
			ao = J.animateZoomOutAboutCenter = function () {
				q(0, 0, nt)
			},
			io = J.animateZoomToFit = function () {
				j(), ht = !0;
				var e = k.getCrop_o(),
					t = Math.min(st[0].width / e.width(), st[0].height / e.height()) * rt / ft;
				q(e.centerX() - pt, e.centerY() - gt, t)
			},
			so = J.zoomToFit = function (e) {
				null == e && (e = !0);
				var t = k.getCrop_o(),
					o = Math.min(st[0].width / t.width(), st[0].height / t.height()) * rt;
				no(t.centerX(), t.centerY(), o), e && oo()
			},
			lo = (J.zoomToFitTight = function (e) {
				null == e && (e = !0);
				var t = k.getCrop_o(),
					o = Math.max(st[0].width / t.width(), st[0].height / t.height());
				no(t.centerX(), t.centerY(), o), e && oo()
			}, J.updateSize = function () {
				if (K) {
					for (var e = K.canvasDiv.outerWidth(), t = X(), o = Math.floor(e / t), n = K.canvasDiv.outerHeight(), r = 0, a = 0; r < st.length; r++) {
						var i = st[r];
						if (i.config.isVisible && (i.width != o || i.height != n)) {
							i.setSize(o, n);
							var s = a * o;
							$(i).css("left", s), i.left = s, i.top = 0, a++
						}
					}
					oo()
				}
			});
		return J
	}
	var l = "#00cc00",
		u = "rgb(60,120,60)",
		c = "#cc0000",
		d = "rgb(120,60,60)",
		p = "#FFFFFF",
		g = "#444444",
		f = "#995200",
		h = "#888888",
		m = "#FF8800",
		w = "#bbbbbb",
		v = "#FFB866",
		b = "#E67A00",
		y = "#888888",
		S = new Image;
	S.src = "data:image/gif;base64,R0lGODdhEAAQAIAAAP///8zMzCwAAAAAEAAQAAACH4RvoauIzNyBSyYaLMDZcv15HAaSIlWiJ5Sya/RWVgEAOw==";
	var k = null,
		M = {
			setM: function (e) {
				k = e
			},
			refreshAllViews: function () {
				M.main.refreshAllViews(), M.subapp.refreshAllViews()
			},
			main: s("main"),
			subapp: s("subapp"),
			ShadowApp: null,
			SwordActiveRed: c,
			SwordInactiveRed: d
		};
	return M
}), define("startupprogress", [], function () {
	var e = {};
	return e.visible = !1, e.show = function () {
		e.visible = !0, $("#startup-lightbox-outer").show()
	}, e.hide = function () {
		e.visible && (e.visible = !1, $("#startup-lightbox-outer").fadeOut(), $("#startup-lightbox").hide())
	}, e
}), define("hairpalettes", ["toolmode", "util", "undo"], function (e, t, o) {
	function n(e, t, o) {
		$("#hair-palette-swatch-" + e + "-" + t).click(function () {
			u(t, o)
		})
	}
	
	function r(e) {
		return parseInt(e, 16)
	}
	
	function a(e) {
		return !isNaN(e)
	}
	
	function i(e) {
		return e.split(",").map(r).filter(a)
	}
	
	function s(e) {
		return (255 & e[0]) << 16 | (255 & e[1]) << 8 | 255 & e[2]
	}
	
	function l(e, t) {
		var o = e[0] - (t >> 16 & 255),
			n = e[1] - (t >> 8 & 255),
			r = e[2] - (255 & t);
		return o * o + n * n + r * r
	}
	
	function u(e, t) {
		var n = y[k][t ? 0 : 1];
		n.length > e && (o.push(), n.splice(e, 1), f(), M.sendSetHairPalette(k))
	}
	
	function c(e) {
		return e = 0 | e, "rgb(" + (e >> 16 & 255) + "," + (e >> 8 & 255) + ", " + (255 & e) + ")"
	}
	
	function d(e, t, o, n) {
		$("#hair-palette-swatch-" + e + "-" + t).css("background-color", o).toggleClass("can-delete", n)
	}
	
	function g(e, t) {
		for (var o = 0, n = Math.min(m, t.length); n > o; o++) d(e, o, c(t[o]), !0);
		for (; m > o; o++) d(e, o, "rgba(0,0,0,0)", !1);
		$("#hair-palette-" + e + "-message").toggle(0 == n)
	}
	
	function f() {
		p = y[k], g("fg", p[0]), g("bg", p[1])
	}
	for (var h = window.Globals.HairColors.length, m = window.Globals.HairMaxNumColors, w = 6, v = w * w, b = {
		NumPalettes: h
	}, y = [], S = 0; h > S; S++) y[S] = [
		[],
		[]
	];
	var k = 0,
		M = null;
	return b.initialize = function (e) {
		M = e;
		for (var t = 0; m > t; t++) n("fg", t, !0), n("bg", t, !1)
	}, b.pickle = function (e) {
		"undefined" == typeof e && (e = k);
		var o = y[e];
		return t.join16(o[0], ",") + ";" + t.join16(o[1], ",")
	}, b.pickleAll = function () {
		for (var e = "", t = 0; h > t; t++) t > 0 && (e += "|"), e += b.pickle(t);
		return e
	}, b.parse = function (e, t) {
		"undefined" == typeof t && (t = k);
		var o = y[t];
		try {
			var n = e.split(";");
			o[0] = i(n[0]), o[1] = i(n[1])
		} catch (r) {
			o[0] = [], o[1] = []
		}
	}, b.parseAll = function (e) {
		var t = 0;
		try {
			for (var o = e.split("|"), n = Math.min(o.length, h); n > t; t++) b.parse(o[t], t);
			for (; h > t; t++) b.parse(null, t)
		} catch (r) {
			for (t = 0; h > t; t++) b.parse(null, t)
		}
		f()
	}, b.tryAddColor = function (e, t) {
		for (var n = y[k][t ? 0 : 1], r = 0; r < n.length; r++)
			if (l(e, n[r]) < v) return !1;
		return o.push(), n.splice(m - 1, n.length), n.push(s(e)), f(), M.sendSetHairPalette(k), !0
	}, b.updatePaletteIndex = function (t) {
		var o = e.PaintHairs.indexOf(t);
		o >= 0 && (k = o, $("#hair-palette-popover-arrow").css("left", 44 * (o + .5) + "px"), f())
	}, b.getPaletteIndex = function () {
		return k
	}, b
}), define("router", ["const"], function () {
	var e = {};
	return e.downloadUrl = function (e, t) {
		return "/images/" + e + "/download/" + t
	}, e.shareUrl = function (e, t) {
		return "/images/" + e + "/" + t
	}, e.surveyUrl = function (e, t) {
		return "/survey?id=" + e + "&secret=" + t
	}, e.redirectUrl = function (e, t, o) {
		return "/internal/redirect?url=" + encodeURIComponent(e) + "&kind=" + encodeURIComponent(t) + "&message=" + encodeURIComponent(o)
	}, e
}), define("autolevels", ["util"], function (e) {
	return function (t) {
		for (var o = t.length / 4, n = Math.min(3e4, o), r = .05 * n, a = 0, i = 20, s = new Uint32Array(1e3), l = 0; n > l; l++) {
			var u = 4 * e.randomInt(o - 1),
				c = t[u + 0] / 255,
				d = t[u + 1] / 255,
				p = (t[u + 2] / 255, e.clamp(Math.floor((.2126 * c + .7152 * d + .0722 * d) * s.length), 0, s.length - 1));
			s[p]++
		}
		var g = 0;
		for (a = 0; g < s.length && (a += s[g], !(a >= r)); g++);
		var f = 0;
		for (a = 0; f < s.length && (a += s[s.length - f - 1], !(a >= r)); f++);
		g /= s.length, f = 1 - f / s.length;
		var h = 1 / f,
			m = 1 / (1 - g / f);
		return h = e.clamp(Math.floor(100 * (h - 1)), 0, i), m = e.clamp(Math.floor(100 * (m - 1)), 0, i), {
			highlights: h,
			shadows: m
		}
	}
}), define("history", ["const"], function () {
	function e() {
		return location.href.split("#")[0]
	}
	var t = {},
		o = null,
		n = null,
		r = "/bulk";
	return t.initialize = function (t) {
		o = t, n = e(), window.onpopstate = function (t) {
			if (console.log("location.href: ", location.href, t.state, n), t.state) {
				var r = t.state;
				resumeUserImage(r.id, r.secret)
			} else o.appHasAlreadyRun && n != e() && location.replace(location.href);
			n = e()
		}
	}, t.goTo = function (t) {
		var o = location,
			a = o.pathname,
			i = "/images/" + t.id + "/edit/" + t.secret,
			s = 0 === a.lastIndexOf(i, 0);
		s ? r = o.protocol + "//" + o.host : (r = o.href, history.pushState(t, "", i), n = e(), console.log("goTo", n))
	}, t.exit = function () {
		location.href = r
	}, t
}), define("shadowapp", ["util", "viewport", "const", "toolmode", "undo", "croprect", "geometry", "canvasex"], function (e, t, o, n, r, a, i, s) {
	function l() {
		wt = c(lt), vt = c(ut), bt = c(ct), yt = c(dt), St = c(pt), kt = c(gt), Mt = c(ft), Ct = c(ht), Rt = c(mt)
	}
	
	function u(e) {
		return e * t.subapp.getZoomScale()
	}
	
	function c(e) {
		return e / t.subapp.getZoomScale()
	}
	
	function d(o, n, a, s, l, c) {
		function d(t, o, n, r, a, i, s) {
			return i || (i = e.empty), s || (s = function () {
				return wt
			}), {
				name: t,
				getX: o,
				getY: n,
				getV: function () {
					var e = o(),
						t = n();
					return {
						x: R.center.x + w(e, t),
						y: R.center.y + v(e, t)
					}
				},
				hitTest: function () {
					return f(o(), n(), s())
				},
				draw: function (e, t) {
					r(e, t, o(), n())
				},
				mouseDrag: a ? a : e.empty,
				mouseDown: i ? i : e.empty
			}
		}
		
		function p(e, t, o, n) {
			var r = u(o),
				a = u(n);
			e.fillCircle(r, a, lt, "#000"), e.fillCircle(r, a, lt - 1, t ? st : it)
		}
		
		function g(e) {
			var t = e.x - R.center.x,
				o = e.y - R.center.y;
			y = h(t, o), S = m(t, o)
		}
		
		function f(t, o, n) {
			return e.sqr(y - t) + e.sqr(S - o) < n * n
		}
		
		function h(e, t) {
			return e * C + t * M
		}
		
		function m(e, t) {
			return -e * M + t * C
		}
		
		function w(e, t) {
			return e * C - t * M
		}
		
		function v(e, t) {
			return e * M + t * C
		}
		
		function b(e) {
			R.angleRad = e, M = Math.sin(e), C = Math.cos(e)
		}
		var y = 0,
			S = 0,
			M = 0,
			C = 1,
			R = {
				shadowType: "ellipse",
				center: i.upgradePoint(o),
				radiusX_i: Math.abs(n),
				radiusY_i: Math.abs(a),
				radiusX_c: function () {
					return u(R.radiusX_i)
				},
				radiusY_c: function () {
					return u(R.radiusY_i)
				},
				angleRad: s,
				strength: l,
				core: 0 === c || c ? c : rt,
				angleDeg: function () {
					return 180 * R.angleRad / Math.PI
				},
				topLeft: d("topLeft", function () {
					return -R.radiusX_i
				}, function () {
					return -R.radiusY_i
				}, p, function (e) {
					R.setRect(e, R.bottomRight.getV())
				}),
				topRight: d("topRight", function () {
					return +R.radiusX_i
				}, function () {
					return -R.radiusY_i
				}, p, function (e) {
					R.setRect(R.bottomLeft.getV(), e)
				}),
				bottomRight: d("bottomRight", function () {
					return +R.radiusX_i
				}, function () {
					return +R.radiusY_i
				}, p, function (e) {
					R.setRect(R.topLeft.getV(), e)
				}),
				bottomLeft: d("bottomLeft", function () {
					return -R.radiusX_i
				}, function () {
					return +R.radiusY_i
				}, p, function (e) {
					R.setRect(e, R.topRight.getV())
				}),
				sliderCore: {
					name: "sliderCore",
					getX: function () {
						return R.radiusX_i * R.core
					},
					getY: function () {
						return 0
					},
					hitTest: function () {
						var e = R.sliderCore.getX() - wt,
							t = e + 2 * wt,
							o = 1.5 * -wt,
							n = 1.5 * +wt;
						return y >= e && t >= y && S >= o && n >= S
					},
					draw: function (e, t) {
						e.globalAlpha = 1, e.strokeLine(0, 0, R.radiusX_c() * at, 0, 4, "#000"), e.strokeLine(1, 0, R.radiusX_c() * at - 1, 0, 2, "#FFF");
						var o = u(R.sliderCore.getX()) - lt,
							n = 2 * lt,
							r = 1.5 * -lt,
							a = 2 * lt * 1.5;
						e.fillStyle = "#000", e.fillRect(o, r, n, a), e.fillStyle = t ? st : it, e.fillRect(o + 1, r + 1, n - 2, a - 2)
					},
					mouseDrag: function (t) {
						if (R.radiusX_i > 0) {
							var o = h(t.x - R.center.x, t.y - R.center.y);
							R.core = e.clamp(o / R.radiusX_i, 0, at)
						}
					},
					mouseDown: e.empty
				},
				move: d("move", function () {
					return 0
				}, function () {
					return -R.radiusY_i - (vt + wt)
				}, function (e, t, o, n) {
					var r = t ? st : it,
						a = u(o),
						i = u(n),
						s = 1.75 * lt,
						l = 2,
						c = 1 * l,
						d = 2.5 * c;
					e.beginPath(), e.triangle(a, i - s, -Math.PI / 2, c, d), e.triangle(a, i + s, Math.PI / 2, c, d), e.triangle(a - s, i, Math.PI, c, d), e.triangle(a + s, i, 0, c, d), e.strokeEx(2, "#000"), e.fillEx(r), p(e, t, o, n)
				}, function (e) {
					var t = R.move.getV();
					R.center.x += e.x - t.x, R.center.y += e.y - t.y
				}, e.empty, function () {
					return 2 * wt
				}),
				remove: d("remove", function () {
					return +R.radiusX_i + 1.7 * wt
				}, function () {
					return -R.radiusY_i - 1.7 * wt
				}, function (e, o, n, r) {
					var a = u(n),
						i = u(r);
					e.fillCircle(a, i, lt, o ? t.SwordActiveRed : t.SwordInactiveRed);
					var s = .8 * lt / Math.sqrt(2);
					e.strokeLine(a - s, i - s, a + s, i + s, 1, o ? "#FFF" : "#DDD"), e.strokeLine(a + s, i - s, a - s, i + s)
				}, e.empty, function () {
					var e = L.indexOf(R);
					e >= 0 && (r.push(), L.splice(e, 1), k(), T())
				}),
				rotator: d("rotator", function () {
					return R.radiusX_i + (vt + wt)
				}, function () {
					return 0
				}, function (e, t, o, n) {
					var r = t ? st : it,
						a = u(o),
						i = u(n),
						s = 2 * lt,
						l = Math.PI / 3;
					e.beginPath(), e.arc(a, i, s, -l, l), e.strokeEx(4, "#000"), e.beginPath();
					var c = a + s * Math.cos(l),
						d = s * Math.sin(l);
					e.triangle(c, i + d, l + Math.PI / 2, 4, 4), e.triangle(c, i - d, -l - Math.PI / 2, 4, 4), e.strokeEx(2, "#000"), e.fillEx(r), e.beginPath(), e.arc(a, i, s, -l, l), e.strokeEx(2, r), p(e, t, o, n)
				}, function (e) {
					b(Math.atan2(e.y - R.center.y, e.x - R.center.x))
				}, e.empty, function () {
					return 2 * wt
				}),
				sliderStrength: {
					name: "sliderStrength",
					hitTest: function () {
						var e = R.sliderStrength.minX_i(),
							t = e + St,
							o = R.radiusY_i + vt,
							n = o + yt;
						return y >= e && t >= y && S >= o && n >= S
					},
					minX_i: function () {
						return R.radiusX_i - St - wt
					},
					minX_c: function () {
						return R.radiusX_c() - pt - lt
					},
					draw: function (e) {
						var t = R.sliderStrength.minX_c(),
							o = R.radiusY_c() + ut;
						e.fillStyle = "#000", e.globalAlpha = 1, e.fillRect(t - 1, o - 1, pt + 2, dt + 2);
						var n = e.createLinearGradient(t, 0, t + pt, 0);
						n.addColorStop(0, "#FFF"), n.addColorStop(1, "#000"), e.fillStyle = n, e.fillRect(t, o, pt, dt);
						var r = t + pt * R.strength;
						e.strokeLine(r, o - 2, r, o + dt + 2, 2, "#C00")
					},
					mouseDrag: function (t) {
						g(t), R.strength = e.clamp((y - R.sliderStrength.minX_i()) / St, 0, 1)
					},
					mouseDown: function (e) {
						R.sliderStrength.mouseDrag(e)
					}
				}
			};
		return R.handles = [R.bottomRight, R.topLeft, R.topRight, R.bottomLeft, R.sliderCore, R.move, R.remove, R.sliderStrength, R.rotator], R.encode = function () {
			return {
				centerX_i: R.center.x,
				centerY_i: R.center.y,
				radiusX_i: R.radiusX_i,
				radiusY_i: R.radiusY_i,
				angleRad: R.angleRad,
				strength: R.strength,
				core: R.core
			}
		}, R.setRect = function (e, t) {
			R.center.x = (e.x + t.x) / 2, R.center.y = (e.y + t.y) / 2;
			var o = (t.x - e.x) / 2,
				n = (t.y - e.y) / 2;
			R.radiusX_i = Math.max(E, Math.abs(h(o, n))), R.radiusY_i = Math.max(E, Math.abs(m(o, n)))
		}, R.hitShadow = function (e) {
			g(e);
			var t = -R.radiusX_i - Rt,
				o = +R.radiusX_i + Mt,
				n = -R.radiusY_i - kt,
				r = +R.radiusY_i + Ct;
			return y >= t && o >= y && S >= n && r >= S
		}, R.hitHandle = function () {
			for (var e = 0; e < R.handles.length; e++)
				if (R.handles[e].hitTest()) return R.handles[e];
			return null
		}, R.drawShadow = function (t, o) {
			if (R.radiusX_i > 0 && R.radiusY_i > 0) {
				var n = 1,
					r = R.radiusY_i / R.radiusX_i,
					a = o.getZoomScale() * R.radiusX_i,
					i = t.createRadialGradient(0, 0, 0, 0, 0, a);
				i.addColorStop(0, "rgba(0,0,0," + R.strength.toFixed(3) + ")"), i.addColorStop(R.core, "rgba(0,0,0," + R.strength.toFixed(3) + ")");
				for (var s = 0; 10 >= s; s++) {
					var l = s / 10,
						u = 1 - l,
						c = e.clamp(R.strength * (-2 * u * u * u + 3 * u * u), 0, 1);
					i.addColorStop(R.core + l * (1 - R.core), "rgba(0,0,0," + c.toFixed(3) + ")")
				}
				t.fillStyle = i, t.scale(n, r), t.fillCircle(0, 0, a)
			}
		}, R.drawControls = function (e) {
			if (e.globalAlpha = 1, e.lineWidth = 4, e.strokeStyle = "#000", e.strokeRect(-u(R.radiusX_i), -u(R.radiusY_i), u(2 * R.radiusX_i), u(2 * R.radiusY_i)), e.lineWidth = 2, e.strokeStyle = it, e.strokeRect(-u(R.radiusX_i), -u(R.radiusY_i), u(2 * R.radiusX_i), u(2 * R.radiusY_i)), _ && _.shadows && _.shadows.indexOf(R) >= 0)
				for (var t = _.handle, o = R.handles.length - 1; o >= 0; o--) {
					var n = R.handles[o];
					n.draw(e, n == t)
				}
		}, b(s), R
	}
	
	function p(e) {
		I.setDropShadowOpacity(H.opacity + e | 0), t.subapp.refreshAllViews()
	}
	
	function g(e) {
		I.setDropShadowBlurRadius(H.blurRadius + e | 0)
	}
	
	function f() {
		$("#shadow-app-drop-shadow-enabled").prop("checked", H.enabled);
		var e = H.opacity == O.opacity;
		$("#shadow-app-drop-shadow-opacity-display").html("" + H.opacity + "%"), $("#shadow-app-drop-shadow-opacity-reset").toggleClass("disabled", e);
		var t = H.blurRadius == O.blurRadius;
		$("#shadow-app-drop-shadow-blur-radius-display").html("" + H.blurRadius + " px"), $("#shadow-app-drop-shadow-blur-radius-reset").toggleClass("disabled", t);
		var o = H.offset == O.offset;
		$("#shadow-app-drop-shadow-offset-display").html("" + H.offset + " px"), $("#shadow-app-drop-shadow-offset-reset").toggleClass("disabled", o);
		var n = H.angle == O.angle;
		$("#shadow-app-drop-shadow-angle-display").html("" + H.angle + "°"), $("#shadow-app-drop-shadow-angle-reset").toggleClass("disabled", n)
	}
	
	function h() {
		Y || -1 == K || (U = new Worker(window.Globals.dropshadow_js), U.addEventListener("message", y), N = K + 2 * P, W = Q + 2 * P, X = N * W, Y = s.newCanvas(N, W), q = Y.context().getImageData(0, 0, N, W), V = q.data, j = new Uint8Array(X))
	}
	
	function m() {
		-1 != K && (H.enabled ? (h(), b()) : Y && (Y.clearAll(), t.refreshAllViews()))
	}
	
	function w() {
		for (var e = 0; X > e; e++) j[e] = 0
	}
	
	function v() {
		var e, t, o;
		for (t = 0, o = 3; Q > t; t++)
			for (e = 0; K > e; e++, o += 4) j[(t + P) * N + e + P] = z.previewCanvasData[o]
	}
	
	function b() {
		if (j) {
			e.tic(), xt.show(), w(), v();
			try {
				U.postMessage({
					w: N,
					h: W,
					blurRadius: H.blurRadius,
					alphas: j
				}, [j.buffer])
			} catch (t) {
				U.postMessage({
					w: N,
					h: W,
					blurRadius: H.blurRadius,
					alphas: j
				})
			}
			j = null, e.toc("ShadowApp.tryUpdateDropShadow")
		}
	}
	
	function y(o) {
		e.tic();
		var n = o.data;
		j = n.alphas;
		for (var r = 0, a = 3; X > r; r++, a += 4) V[a] = j[r];
		Y.context().putImageData(q, 0, 0), xt.hide(), e.toc("ShadowApp.dropShadowCanvasUpdated"), t.refreshAllViews(), n.blurRadius != H.blurRadius && b()
	}
	
	function S() {
		$("#shadow-app-sidebar").hide(), $("#subapp-lightbox").modal("hide"), J = t.subapp.showing = !1, I.onhide()
	}
	
	function k() {
		tt = null, ot = !0
	}
	
	function M() {
		l();
		var e = t.subapp.getMouse_i(),
			o = n.getSelectedMode();
		if (o == n.Grab) {
			for (var r = [], a = 0; a < L.length; a++) {
				var i = L[a];
				i.hitShadow(e) && r.push(i)
			}
			var s = null,
				u = null;
			for (a = 0; a < r.length; a++)
				if (i = r[a], u = i.hitHandle()) {
					s = i;
					break
				}
			return C(r, s, u), u ? n.ShadowArrow : null
		}
		return R(), null
	}
	
	function C(e, t, o) {
		_.shadows = e, _.shadow = t, _.handle = o
	}
	
	function R() {
		C([], null, null)
	}
	
	function x() {
		G.downState = $.extend({}, _)
	}
	
	function T() {
		G.v0 = null, G.v2 = null, G.downState = null, G.firstMove = !0
	}
	
	function A(e, t, o) {
		function n(o, n, r, a) {
			e.save(), e.translate(t.o2cX(n), t.o2cY(r)), e.rotate(o), a(), e.restore()
		}
		for (var r = 0; r < L.length; r++) {
			var a = L[r];
			n(a.angleRad, a.center.x, a.center.y, function () {
				o(a)
			})
		}
	}
	
	function D() {
		ot && (ot = !1, I.shadowsUpdated())
	}
	var I = {},
		z = null,
		F = 75,
		P = 225,
		E = 10,
		B = {
			isVisible: !0,
			showPreview: !0,
			showFrame: !0,
			showBackground: !0,
			title: "",
			borderRight: !1,
			borderLeft: !1,
			clip: !1
		};
	t.ShadowApp = I;
	var E = 10,
		U = null,
		L = [],
		G = {
			v0: null,
			v2: null,
			downState: null
		},
		_ = {
			shadows: [],
			shadow: null,
			handle: null
		},
		O = {
			enabled: !1,
			opacity: 75,
			blurRadius: 25,
			offsetX: 30,
			offsetY: 30
		},
		H = $.extend(!0, {}, O),
		N = -1,
		W = -1,
		X = -1,
		Y = null,
		q = null,
		V = null,
		j = null,
		Z = !1,
		J = !1,
		K = -1,
		Q = -1,
		et = -1,
		tt = null,
		ot = !1,
		nt = .5,
		rt = .25,
		at = .999,
		it = "#FF0",
		st = "#F80",
		lt = 6,
		ut = lt,
		ct = lt,
		dt = 14,
		pt = 60,
		gt = 3 * lt + ut + lt,
		ft = 4 * lt + lt,
		ht = ct + dt + lt,
		mt = lt + lt,
		wt = 0,
		vt = 0,
		bt = 0,
		yt = 0,
		St = 0,
		kt = 0,
		Mt = 0,
		Ct = 0,
		Rt = 0,
		xt = $("#shadow-app-drop-shadow-updating-indicator");
	I.setModel = function (e) {
		z = e
	}, I.onhide = e.empty, I.initialize = function () {
		if (!Z) {
			Z = !0, K = 0 | z.imageSize.w, Q = 0 | z.imageSize.h, et = K * Q, $("#shadow-app-close-button").click(S), $("#shadow-app-bottom-close-button").click(S), $("#shadow-app-reset-button").click(function () {
				I.clear()
			});
			var o = 50;
			e.mouseDownRepeater($("#shadow-app-drop-shadow-opacity-decrease"), I.dropShadowOpacityDecrement, o, r.push, D), e.mouseDownRepeater($("#shadow-app-drop-shadow-opacity-increase"), I.dropShadowOpacityIncrement, o, r.push, D), $("#shadow-app-drop-shadow-opacity-reset").click(I.dropShadowOpacityReset), e.mouseDownRepeater($("#shadow-app-drop-shadow-blur-radius-decrease"), I.dropShadowBlurRadiusDecrement, 3 * o, r.push, function () {
				m(), D()
			}), e.mouseDownRepeater($("#shadow-app-drop-shadow-blur-radius-increase"), I.dropShadowBlurRadiusIncrement, 3 * o, r.push, function () {
				m(), D()
			}), $("#shadow-app-drop-shadow-blur-radius-reset").click(I.dropShadowBlurRadiusReset), $("#shadow-app-drop-shadow-enabled").click(function () {
				I.setDropShadowEnabled(!H.enabled, !0)
			}), $("#shadow-drop-move-tool").click(function () {
				H.enabled || I.setDropShadowEnabled(!0, !0)
			});
			var n = t.subapp.repeaterDelay;
			e.mouseDownRepeater($("#shadow-app-zoom-in"), t.subapp.animateZoomInAboutCenter, n), e.mouseDownRepeater($("#shadow-app-zoom-out"), t.subapp.animateZoomOutAboutCenter, n), $("#shadow-app-zoom-to-fit").mousedown(function (e) {
				e.shiftKey ? t.subapp.zoomToFitTight() : t.subapp.animateZoomToFit()
			}), m()
		}
	}, I.show = function () {
		n.Grab.pick(), $(".subapp-sidebar").hide(), $("#shadow-app-sidebar").show(), e.modal("#subapp-lightbox"), t.subapp.setViewConfigAndShow(B, I), f(), J = !0, I.updateDisplay()
	}, I.setDropShadowEnabled = function (e, t) {
		return e != H.enabled ? (t && r.push(), H.enabled = e, k(), f(), m(), t && D(), !0) : !1
	}, I.setDropShadowOpacity = function (t) {
		var o = Math.round(e.clamp(t, 0, 100));
		o != H.opacity && (H.opacity = o, k(), f())
	}, I.dropShadowOpacityReset = function () {
		H.opacity != O.opacity && (r.push(), I.setDropShadowOpacity(O.opacity), D())
	}, I.dropShadowOpacityDecrement = function () {
		p(-1)
	}, I.dropShadowOpacityIncrement = function () {
		p(1)
	}, I.setDropShadowBlurRadius = function (t) {
		var o = Math.round(e.clamp(t, 0, F));
		o != H.blurRadius && (H.blurRadius = o, k(), f())
	}, I.dropShadowBlurRadiusReset = function () {
		H.blurRadius != O.blurRadius && (r.push(), I.setDropShadowBlurRadius(O.blurRadius), m(), D())
	}, I.dropShadowBlurRadiusDecrement = function () {
		g(-1)
	}, I.dropShadowBlurRadiusIncrement = function () {
		g(1)
	}, I.setDropShadowOffset = function (e, t) {
		(e != H.offsetX || t != H.offsetY) && (H.offsetX = e, H.offsetY = t, k(), f())
	}, I.dropShadowOffsetReset = function () {
		(H.offsetX != O.offsetX || H.offsetY != O.offsetY) && (r.push(), I.setDropShadowOffset(O.offsetX, O.offsetY), D())
	}, I.keyDownHandler = function (e) {
		switch (e.keyCode) {
			case 27:
				S();
				break;
			case 69:
				n.select(n.ShadowEllipse)
		}
		return !0
	}, I.updateDisplay = function () {};
	var $t = !1;
	return I.mouseDownHandler = function (e) {
		var r = t.subapp.getMouse_i();
		T(), n.isNot(n.Grab) && e.which == o.MouseButtonLeft && ($t = !1, G.v0 = t.subapp.getMouse_i(), n.getActiveMode() == n.ShadowDropMove && (G.dropShadowOffsetX0 = H.offsetX, G.dropShadowOffsetY0 = H.offsetY), x(), G.downState && G.downState.handle && G.downState.handle.mouseDown(r))
	}, I.mouseMoveHandler = function () {
		var e = t.subapp.getMouse_i();
		if (t.subapp.getMouseIsDown()) {
			if (n.is(n.ShadowEllipse)) {
				G.firstMove && r.push();
				var o = d({
					x: 0,
					y: 0
				}, 0, 0, 0, nt, rt);
				o.setRect(G.v0, e), L.push(o), k(), n.forceSelection(n.Grab, n.ShadowArrow, null), C([o], o, o.bottomRight), x()
			} else if (n.is(n.ShadowArrow) && G.downState && G.downState.handle) {
				G.firstMove && r.push();
				var a = G.downState;
				a.handle.mouseDrag(e), k()
			} else if (n.getActiveMode() == n.ShadowDropMove) {
				G.firstMove && r.push();
				var i = G.dropShadowOffsetX0 + e.x - G.v0.x,
					s = G.dropShadowOffsetY0 + e.y - G.v0.y;
				I.setDropShadowOffset(i, s), k()
			}
			G.firstMove = !1
		} else if (!t.subapp.getShiftIsDown()) {
			var l = M();
			n.setTempSelect(l)
		}
		t.subapp.refreshAllViews()
	}, I.mouseUpHandler = function () {
		$t && z.sendSetGlobal(), T(), D()
	}, I.mouseWheelHandler = I.mouseMoveHandler, I.drawOver_c = e.empty, I.drawUnder_i = function (e, t, o, n) {
		A(t, o, function (e) {
			e.drawShadow(t, o)
		}), H.enabled && n(Y, H.opacity / 100, H.offsetX - P, H.offsetY - P)
	}, I.drawOver_i = function (e, o) {
		(t.subapp.mouseIsOver || G.downState) && A(o, t.subapp, function (e) {
			e.drawControls(o)
		})
	}, I.encode = function () {
		if (null != tt) return tt;
		tt = {
			ellipses: []
		};
		for (var e = 0; e < L.length; e++) tt.ellipses[e] = L[e].encode();
		return tt.dropShadow = {
			offsetX: H.offsetX,
			offsetY: H.offsetY,
			opacity: 0 | H.opacity,
			blurRadius: 0 | H.blurRadius,
			enabled: H.enabled
		}, console.log("ShadowApp.encode", tt), tt
	}, I.decode = function (e) {
		tt = e, L.length = 0;
		try {
			if (console.log("ShadowApp.decode", e), e) {
				if (e.ellipses)
					for (var t = 0; t < e.ellipses.length; t++) {
						var o = e.ellipses[t];
						L.push(d({
							x: o.centerX_i,
							y: o.centerY_i
						}, o.radiusX_i, o.radiusY_i, o.angleRad, o.strength, o.core))
					}
				if (e.dropShadow) {
					var n = e.dropShadow,
						r = H.blurRadius;
					H.offsetX = n.offsetX, H.offsetY = n.offsetY, H.opacity = n.opacity, H.blurRadius = n.blurRadius, H.enabled = n.enabled, f(), r != n.blurRadius && m()
				}
			}
		} catch (o) {
			console.log("Failed to decode shadows", e, o)
		}
		R()
	}, I.clear = function () {
		var e = L.length > 0 || H.offsetX != O.offsetX || H.offsetY != O.offsetY || H.opacity != O.opacity || H.blurRadius != O.blurRadius || H.enabled != O.enabled;
		e && r.push(), L.length > 0 && (L.length = 0), H.offsetX = O.offsetX, H.offsetY = O.offsetY, H.opacity = O.opacity, H.blurRadius = O.blurRadius, H.enabled = O.enabled, e && (k(), D(), f(), m()), n.Grab.pick()
	}, I.shadowsUpdated = e.empty, I.ellipseShadows = L, I.updateDropShadowCanvas = m, I
}), define("tutorial", ["util"], function () {
	var e = {};
	return e.visible = !1, e.buttonSelector = "#help-button", e.popoverSelector = "#help-popover", e.toggle = function () {
		return e.visible ? e.hide() : e.show(), !1
	}, e.initialize = function () {
		$(e.buttonSelector).click(e.toggle)
	}, e.show = function () {
		e.visible || ($("html").addClass("help-showing").removeClass("help-hidden"), $(e.buttonSelector).addClass("active"), $(e.popoverSelector).slideDown(), e.visible = !0)
	}, e.hide = function () {
		e.visible && ($("html").removeClass("help-showing").addClass("help-hidden"), $(e.buttonSelector).removeClass("active"), $(e.popoverSelector).slideUp(), e.visible = !1)
	}, e.knockknock = function () {
		e.visible || (e.show(), setTimeout(e.hide, 2e3))
	}, e
}), define("guide", ["tutorial"], function (e) {
	function t() {
		$("#guide-lightbox-outer").show()
	}
	
	function o() {
		$("#guide-lightbox-outer").fadeOut(), e.knockknock()
	}
	
	function n() {
		try {
			for (var e = 0; e < p.length; e++) document.getElementById("video-" + p[e]).load()
		} catch (t) {
			console.log("Failed to preload videos", t)
		}
	}
	
	function r(e) {
		var t = $(e),
			o = t.offset(),
			n = t.outerWidth();
		return Math.max(0, n / 2 + o.left - 20) + "px"
	}
	
	function a(e) {
		m.removeClass(g).addClass(e)
	}
	
	function i(e, t) {
		if (t) {
			var o = r(e);
			m.removeClass("top").addClass("bottom").animate({
				left: o,
				top: "0px"
			})
		} else {
			var n = m.parent().height() - m.outerHeight() - 40;
			m.removeClass("bottom").addClass("top").animate({
				left: "40px",
				top: n + "px"
			})
		}
	}
	
	function s() {
		w && (console.log("Guide Pausing", w), w.pause(), w = null)
	}
	
	function l(e) {
		s(), w = document.getElementById(e), console.log("Guide Playing", e, w), w && w.play()
	}
	
	function u(e) {
		a("show-" + e), i("#" + e + "-tool", !0), l("video-" + e)
	}
	
	function c() {
		h++, h < p.length ? u(p[h]) : h == p.length ? (a("show-bottom"), i("#app-bottom-toolbar", !1), s()) : o()
	}
	var d = {},
		p = ["green", "erase", "sword"],
		g = "show-green show-erase show-sword show-bottom",
		f = !1,
		h = -1,
		m = null,
		w = null;
	return d.start = function () {
		f || (f = !0, m = $("#guide-lightbox"), $(".guide-next-button").click(c), n()), h = -1, c(), t()
	}, window.startGuide = d.start, d
}), define("model", ["fileuploader", "retrydialog", "workerapi", "canvasex", "util", "const", "viewport", "toolmode", "startupprogress", "undo", "hairpalettes", "router", "autolevels", "croprect", "webapi", "history", "filedropper", "sword", "shadowapp", "guide", "tutorial"], function (e, t, o, n, r, a, i, s, l, u, c, d, p, g, f, h, m, w, v, b, y) {
	function S() {
		uo && !$t.hasUnsavedChanges() && M(!0), Mt(), xt({
			command: a.MaybeSaved
		})
	}
	
	function k() {
		$t.App.showing = !1, Globals.Bulk.isIframe && xt({
			command: a.Exiting
		}), $t.hasUnsavedChanges() ? (r.saveAndExit(!0), uo = !0, $t.checkSaveDrawCommands()) : (Globals.Bulk.isIframe && !Globals.Bulk.isApiSingle && r.saveAndExit(!0), M(!0))
	}
	
	function M(e) {
		return $t.unhookBeforeunload(), Globals.Bulk.isIframe ? xt({
			command: a.Exit,
			isNice: !!e
		}) : h.exit(), !1
	}
	
	function C() {
		return so.hasImage == $t.hasImage && so.hasThumbnail == $t.hasThumbnail && so.hasDrawCommands == $t.hasDrawCommands
	}
	
	function R() {
		$t.appHasAlreadyRun = !0, Globals.Bulk.isIframe || h.goTo(qt), $(window).on("beforeunload", function () {
			return $t.hasUnsavedChanges() ? "There are unsaved changes." : void 0
		}), $(".force-exit").click(M), $("#exit-app").click(k).removeAttr("disabled")
	}
	
	function x() {
		var e;
		e = 0 == $t.hasThumbnail || 0 == $t.hasImage ? a.LightProgress : Yt == Xt ? a.LightUpdated : o.isConnected ? a.LightUpdating : a.LightConnecting, Wt != e && (Wt = e, $t.App.initialized && $t.App.setLightState(e))
	}
	
	function T() {
		var e;
		e = Ot || Ht ? a.SaveSaving : Bt ? a.SaveSave : a.SaveSaved, Nt != e && (Nt = e, $t.App.initialized && $t.App.setSaveState(e))
	}
	
	function A() {
		var e = {
			userMask: $t.userMask.encode(),
			hairPalettes: c.pickleAll(),
			sword: w.encode(),
			shadowApp: v.encode()
		};
		window.Globals.UseHair && (e.hairMask = $t.hairMask.encode());
		var t = $.extend(!0, e, $t.settings);
		return $t.settings.cropFitToResult && delete t.cropRect_o, t
	}
	
	function D() {
		return JSON.stringify(A())
	}
	
	function I() {
		var e = $("#color-picker-color"),
			t = $("#color-picker-ui-popover");
		no = $("#color-picker-ui").farbtastic("#color-picker-color", function (e) {
			$("#background-color-swatch-button-custom").data("color", e), $("#background-color-swatch-button-custom .swatch").css("background-color", e), ro && (clearTimeout(ao), ao = setTimeout(function () {
				$t.setBackgroundColor(e, !0)
			}, 100))
		}).get(0).farbtastic, e.blur(function () {
			t.hide()
		}).focus(function () {
			var o = e.position();
			t.css({
				bottom: e.outerHeight() + o.top + 6,
				left: o.left + (e.outerWidth() - t.outerWidth()) / 2
			}).show()
		}).keydown(function (e) {
			e.stopPropagation()
		}), window.Globals.BackgroundColors.push(0), z(myLocalStorage.customColor || "#338855")
	}
	
	function z(e) {
		ro = !1, no.setColor(e), ro = !0, window.Globals.BackgroundColors[window.Globals.BackgroundColors.length - 1] = e
	}
	
	function F(e, i, l) {
		m.disable(), I(), $t.setStickySettings(window.Globals.stickySettings, !1), Ut = !1, Vt = !1, It = e.width, zt = e.height, $t.imageSize = {
			w: It,
			h: zt
		}, $t.settings.cropTargetSize = {
			w: It,
			h: zt
		}, $t.settings.cropAspectRatio = r.fuzzyAspectRatio($t.settings.cropTargetSize), Ft = It / 2, Pt = zt / 2, $t.imageCanvas = e, qt = i, $t.previewCanvas = n.newCanvas(It, zt), $t.previewCanvas.context().drawImage(e, 0, 0), jt = $t.previewCanvas.context().getImageData(0, 0, It, zt), Zt = jt.data, $t.previewCanvasData = Zt, Jt = jt, Kt = Zt, to = $t.imageCanvas.context().getImageData(0, 0, It, zt), oo = to.data, R(), console.log("Model.setImage, calling WorkerApi.initialize"), o.initialize({
			imageId: qt.id,
			secret: qt.secret,
			newMessageFromServer: ot,
			connectedToNewServer: nt,
			disconnectedFromServer: rt,
			failedToConnect: t.register
		}), Yt = 0, Xt = 0, $t.userMask = n.newMask(e.width, e.height, [0, s.Background.abgr32, s.Foreground.abgr32]), $t.hairMask = n.newMask(e.width, e.height, [0].concat(s.PaintHairs.map(function (e) {
			return e.abgr32
		}))), v.initialize(), U(l, !1), "duplicate" == $t.entryPoint ? (Bt = !0, _t = null) : (Bt = !1, _t = D()), $t.checkSaveDrawCommands(), Ut = !0, c.initialize($t), $t.App.imageUpdated(), x(), xt({
			command: a.Booted
		})
	}
	
	function P(e) {
		return "undefined" == typeof e || null === e
	}
	
	function E(e) {
		return !P(e)
	}
	
	function B(e, t, o) {
		return E(e) ? e : E(t) ? t : o
	}
	
	function U(e, t) {
		e.hasOwnProperty("userMask") && $t.userMask.decode(e.userMask), e.hasOwnProperty("hairMask") && $t.hairMask.decode(e.hairMask), c.parseAll(e.hairPalettes);
		var o = $t.defaultSettings;
		$t.setBackgroundColor(B(e.backgroundColor, o.backgroundColor), !1), $t.setGlobalBlurLevel(B(e.globalBlurLevel, o.globalBlurLevel), !1), $t.setGlobalSmoothingLevel(B(e.globalSmoothingLevel, o.globalSmoothingLevel), !1), $t.setGlobalOffset(B(e.globalOffset, o.globalOffset), !1), $t.setIsAutoEdge(B(e.isAutoEdge, o.isAutoEdge), !1), $t.setRotateAngleDeg(B(e.rotateAngleDeg, 0), !1), $t.setStraightenAngleDeg(B(e.straightenAngleDeg, 0)), $t.setBrightness(B(e.brightness, 0)), $t.setShadows(B(e.shadows, 0)), $t.setHighlights(B(e.highlights, 0)), $t.setTemperature(B(e.temperature, 0)), $t.setCrop_o(g(B(e.cropRect_o, null)), !1), $t.setCropMode(B(e.cropMode, o.cropMode), !1), $t.setCropAspectRatio(B(e.cropAspectRatio, o.cropAspectRatio, $t.settings.cropAspectRatio), !1, !1), $t.setCropTargetSize(B(e.cropTargetSize, o.cropTargetSize, $t.settings.cropTargetSize), !1, !1), $t.setCropPadding(B(e.cropPaddingMils, o.cropPaddingMils)), $t.setCropFitToResult(B(e.cropFitToResult, o.cropFitToResult), !1), $t.setCropAllowEnlarging(B(e.cropAllowEnlarging, o.cropAllowEnlarging), !1, !1), w.decode(e.sword), v.decode(e.shadowApp), q(), H(), t && (go(), ho(), St(), kt(), bt(), wt(!0), vt(!0), i.main.refreshAllViews())
	}
	
	function L() {
		var e = " ";
		e += $t.settings.isAutoEdge ? "Auto" : "" + $t.settings.globalSmoothingLevel + ", " + $t.settings.globalBlurLevel + ", " + $t.settings.globalOffset, $("#blur-offset-smooth-button-label").text(e)
	}
	
	function G(e) {
		var t = e.w / e.h,
			o = $t.settings.cropRect_o,
			n = o.width(),
			r = o.height(),
			a = n / r;
		if (t > a) {
			var i = (r * t - n) / 2;
			$t.settings.cropRect_o.left0 -= i, $t.settings.cropRect_o.right0 += i
		} else {
			var s = (n / t - r) / 2;
			$t.settings.cropRect_o.top0 -= s, $t.settings.cropRect_o.bottom0 += s
		}
	}
	
	function _(e) {
		$t.setCropPadding($t.settings.cropPaddingMils + e)
	}
	
	function O(e, t) {
		return Math.abs(e - t) <= 1 + $t.settings.globalOffset
	}
	
	function H() {
		var e = g($t.settings.cropRect_o);
		if ($t.settings.cropFitToResult && $t.boundingRect) {
			var t = ($t.boundingRect[2] - $t.boundingRect[0]) * $t.settings.cropPaddingMils * .001,
				o = ($t.boundingRect[3] - $t.boundingRect[1]) * $t.settings.cropPaddingMils * .001,
				n = O($t.boundingRect[0], Et.left0) ? 0 : t,
				r = O($t.boundingRect[2], Et.right0) ? 0 : t,
				s = O($t.boundingRect[1], Et.top0) ? 0 : o,
				l = O($t.boundingRect[3], Et.bottom0) ? 0 : o;
			$t.settings.cropRect_o.left0 = $t.boundingRect[0] - n, $t.settings.cropRect_o.right0 = $t.boundingRect[2] + r, $t.settings.cropRect_o.top0 = $t.boundingRect[1] - s, $t.settings.cropRect_o.bottom0 = $t.boundingRect[3] + l
		}
		$t.settings.cropMode == a.CropLockedAspectRatio ? G($t.settings.cropAspectRatio) : $t.settings.cropMode == a.CropTargetSize && G($t.settings.cropTargetSize), $t.settings.cropFitToResult || e.softEquals($t.settings.cropRect_o, .001) || Rt(), $t.CropApp.updateDisplay(), i.refreshAllViews()
	}
	
	function N(e, t) {
		return null == e ? null == t : null == t ? !1 : e.h == t.h && e.w == t.w
	}
	
	function W(e) {
		u.push(), $t.settings.rotateAngleDeg += e, q(), $t.settings.cropMode != a.CropUnconstrained || $t.settings.cropFitToResult || $t.settings.cropRect_o.isEmpty() || ($t.settings.cropRect_o.rotate(e, Ft, Pt), H()), ho()
	}
	
	function X(e) {
		$t.setStraightenAngleDeg(r.clamp($t.settings.straightenAngleDeg + e, -45, 45))
	}
	
	function Y() {
		return zt > It
	}
	
	function q() {
		var e = po(),
			t = It,
			o = zt,
			n = Y();
		n && (o = It, t = zt);
		var r = Math.sqrt(t * t + o * o),
			a = o / r,
			s = Math.acos(a),
			l = s - Math.abs(e),
			u = Math.cos(l) / a,
			c = t * u,
			d = o * u,
			p = (t - c) / 2,
			g = (o - d) / 2,
			f = p,
			h = g,
			m = p + c,
			w = g + d;
		n && (f = g, h = p, m = g + d, w = p + c);
		var v = co(),
			b = Math.sin(v),
			y = Math.cos(v),
			S = f - Ft,
			k = h - Pt,
			M = m - Ft,
			C = w - Pt,
			R = y * S - b * k + Ft,
			x = b * S + y * k + Pt,
			T = y * M - b * C + Ft,
			A = b * M + y * C + Pt;
		Et.left0 = Math.min(R, T), Et.right0 = Math.max(R, T), Et.top0 = Math.min(x, A), Et.bottom0 = Math.max(x, A), $("#straighten-reset").toggleClass("disabled", 0 == $t.settings.straightenAngleDeg), i.main.rotationCropUpdated(), i.main.refreshAllViews()
	}
	
	function V(e) {
		$t.setBrightness($t.settings.brightness + e)
	}
	
	function j(e) {
		$t.setShadows($t.settings.shadows + e)
	}
	
	function Z(e) {
		$t.setHighlights($t.settings.highlights + e)
	}
	
	function J(e) {
		$t.setTemperature($t.settings.temperature + e)
	}
	
	function K() {
		return Qt ? Jt : jt
	}
	
	function Q() {
		var e = 0 == $t.settings.brightness;
		$("#brightness-decrease").toggleClass("disabled", -100 == $t.settings.brightness), $("#brightness-increase").toggleClass("disabled", 100 == $t.settings.brightness), $("#brightness-reset").toggleClass("disabled", e), $("#brightness-display").html(tt($t.settings.brightness));
		var t = 0 == $t.settings.shadows;
		$("#shadows-decrease").toggleClass("disabled", -100 == $t.settings.shadows), $("#shadows-increase").toggleClass("disabled", 100 == $t.settings.shadows), $("#shadows-reset").toggleClass("disabled", t), $("#shadows-display").html(tt($t.settings.shadows));
		var o = 0 == $t.settings.highlights;
		$("#highlights-decrease").toggleClass("disabled", -100 == $t.settings.highlights), $("#highlights-increase").toggleClass("disabled", 100 == $t.settings.highlights), $("#highlights-reset").toggleClass("disabled", o), $("#highlights-display").html(tt($t.settings.highlights));
		var n = 0 == $t.settings.temperature;
		$("#temperature-decrease").toggleClass("disabled", -100 == $t.settings.temperature), $("#temperature-increase").toggleClass("disabled", 100 == $t.settings.temperature), $("#temperature-reset").toggleClass("disabled", n), $("#temperature-display").html(tt($t.settings.temperature)), Qt = !(e && t && o && n), $("#color-levels-reset").toggleClass("disabled", e && t && o && n), Qt && Kt == Zt && (Jt = $t.previewCanvas.context().getImageData(0, 0, It, zt), Kt = Jt.data), eo = et(), gt(), it(), i.main.refreshAllViews()
	}
	
	function et() {
		var e = $t.settings.brightness,
			t = 1 + $t.settings.shadows / 100,
			o = 1 + $t.settings.highlights / 100,
			n = -$t.settings.temperature / 100,
			a = (0 > n ? 6600 + 5100 * n : 6600 + 8400 * n) / 100,
			i = 1,
			s = 1,
			l = 1;
		return 66 > a ? (s = r.clamp(99.4708025861 * Math.log(a) - 161.1195681661, 0, 255) / 255, l = 19 >= a ? 0 : r.clamp(138.5177312231 * Math.log(a - 10) - 305.0447927307, 0, 255) / 255) : a > 66 && (i = r.clamp(329.698727446 * Math.pow(a - 60, -.1332047592), 0, 255) / 255, s = r.clamp(288.1221695283 * Math.pow(a - 60, -.0755148492), 0, 255) / 255),
			function (n, r, a, u, c) {
				var d = Math.min(255, Math.max(0, (255 - (255 - (a + e) * o) * t) * i)),
					p = Math.min(255, Math.max(0, (255 - (255 - (u + e) * o) * t) * s)),
					g = Math.min(255, Math.max(0, (255 - (255 - (c + e) * o) * t) * l));
				Kt[n + 0] = d, Kt[n + 1] = p, Kt[n + 2] = g, Kt[n + 3] = r
			}
	}
	
	function tt(e) {
		return 0 == e ? "0" : e > 0 ? "+" + e : "" + e
	}
	
	function ot(e) {
		switch (e.response) {
			case a.ServerMask:
				at(e);
				break;
			case a.ServerMaskDone:
				v.updateDropShadowCanvas(), it();
				break;
			case a.MaskCounts:
				$t.serverMaskCounts = e;
				break;
			case a.BezierSet:
				st(e);
				break;
			case a.BezierSetDone:
				lt();
				break;
			case a.BoundingRect:
				$t.boundingRect = e.boundingRect, H();
				break;
			case a.EmptyServerMask:
				pt(), gt(), it(), lt();
				break;
			case a.UpdateComplete:
				i.main.refreshAllViews();
				break;
			case a.EngineInitialized:
				l.hide();
				break;
			case a.SetUserMask:
				$t.userMask.decode(e.data), i.main.refreshAllViews();
				break;
			case a.SetHairMask:
				$t.hairMask.decode(e.data), i.main.refreshAllViews();
				break;
			case a.SetActiveSwords:
				w.setActiveSwords(e.activeSwords, e.index);
				break;
			case a.ResultPending:
				console.log("ResultPending", e.msg), $t.App.resultPending(e.msg, e.percent);
				break;
			case a.ResultReady:
				Vt = !1, $t.result.ready = !0, $t.result.shown = !1, $t.result.posted = !1, $t.result.success = e.success, $t.result.msg = e.msg, Mt();
				break;
			case a.Meta:
				console.log("Meta message", e.meta), so = e.meta, S();
				break;
			case a.Panic:
				r.gaTrack("ErrorShown", "Panic", e.message), alert("Terribly sorry, but an unrecoverable server error has occurred:\n\n" + e.message + "\n\nPlease try again, or try another image. "), M();
				break;
			case a.Message:
				alert(e.message)
		}
		e.hasOwnProperty("index") && (Yt = e.index), x()
	}
	
	function nt(e) {
		Ut = !1, hasReceivedServerMaskSinceLastConnect = !1, t.deregister(e), console.log("connectedToNewServer", e), go(), ho(), St(), kt(), bt(), wt(!1), vt(!1), mt(), Vt && mo(), x(), Ut = !0
	}
	
	function rt(e) {
		console.log("disconnectedFromServer", e, Xt, Yt, Vt), x(), (Xt != Yt || Vt || l.visible || !C()) && o.disconnectError()
	}
	
	function at(e) {
		var t = r.makeBufferReader(e);
		"RunLength" == e.mode ? ft(t) : "AdaptiveDelta" == e.mode && ht(t)
	}
	
	function it() {
		$t.previewCanvas.context().putImageData(K(), 0, 0)
	}
	
	function st(e) {
		var t = r.makeBufferReader(e),
			o = (t.length() - 10) / 2 + 2,
			n = new Float32Array(o),
			a = t.readInt16(),
			i = t.readInt32() / a,
			s = t.readInt32() / a,
			l = 0;
		for (n[l++] = i, n[l++] = s; o > l; l += 2) i = n[l] = t.readSignedInt16() / a + i, s = n[l + 1] = t.readSignedInt16() / a + s;
		Dt.push(n)
	}
	
	function lt() {
		$t.bezierSet = Dt, Dt = []
	}
	
	function ut(e, t) {
		Zt[e + 3] = t, Qt && (Kt[e + 3] = t)
	}
	
	function ct(e, t, o, n, r) {
		Zt[e + 0] = o, Zt[e + 1] = n, Zt[e + 2] = r, Zt[e + 3] = t, Qt && eo(e, t, o, n, r)
	}
	
	function dt(e, t, o, n, r) {
		Kt[e + 0] = o, Kt[e + 1] = n, Kt[e + 2] = r, Kt[e + 3] = t
	}
	
	function pt() {
		if ("undefined" == typeof Zt.set)
			for (var e = 0, t = oo.length; t > e; e++) Zt[e] = oo[e];
		else Zt.set(oo, 0)
	}
	
	function gt() {
		if (Qt)
			for (var e = 0, t = Zt.length; t > e; e += 4) {
				var o = Zt[e + 3];
				0 == o ? Kt[e + 3] = 0 : eo(e, o, Zt[e + 0], Zt[e + 1], Zt[e + 2])
			}
	}
	
	function ft(e) {
		var t = 4 * e.readInt32();
		for (0 == t && (pt(), gt()); e.hasMore();) {
			var o = e.readInt8();
			if (0 == o || 255 == o)
				for (var n = e.readIntDefaultSize() + 1, r = 0; n > r; r++, t += 4) ut(t, o);
			else ct(t, o, e.readInt8(), e.readInt8(), e.readInt8()), t += 4
		}
	}
	
	function ht(e) {
		if (e.nonEmpty()) {
			for (var t = (r.currentTimeMillis(), 0); e.hasMore();) {
				t += 4 * e.readIntAdaptiveSize();
				var o = e.readInt8();
				0 == o ? ut(t, o) : 255 == o ? ct(t, o, oo[t + 0], oo[t + 1], oo[t + 2]) : ct(t, o, e.readInt8(), e.readInt8(), e.readInt8())
			} {
				r.currentTimeMillis()
			}
		}
	}
	
	function mt() {
		Ct({
			command: a.Meta,
			hasImage: $t.hasImage,
			hasThumbnail: $t.hasThumbnail,
			hasDrawCommands: $t.hasDrawCommands
		})
	}
	
	function wt(e) {
		Ct({
			command: a.SetUserMask,
			data: $t.userMask.encode(),
			isDirtying: e
		})
	}
	
	function vt(e) {
		Ct({
			command: a.SetHairMask,
			data: $t.hairMask.encode(),
			isDirtying: e
		})
	}
	
	function bt() {
		for (var e = 0; e < c.NumPalettes; e++) fo(e)
	}
	
	function yt(e, t, o, n, r, a) {
		Ct({
			command: e,
			x0: t,
			y0: o,
			x1: n,
			y1: r,
			d: a
		})
	}
	
	function St() {
		return $("#is-auto-edge-button-true").toggleClass("disabled", w.hasSomeSwords()), w.hasSomeSwords() && ($("#is-auto-edge-button-false").button("toggle"), $t.setIsAutoEdge(!1, !0)), Ct({
			command: a.SetSwords,
			swords: w.encode()
		}), Xt
	}
	
	function kt() {
		return Ct({
			command: a.SetClientShadows,
			shadows: v.encode()
		}), Xt
	}
	
	function Mt() {
		var e = $t.hasUnsavedChanges();
		console.log("checkShowResult", $t.result.ready, $t.result.shown, $t.result.posted, e, $t.result.ready && !$t.result.shown && !e), $t.result.ready && ($t.result.posted || e || ($t.result.posted = !0, xt({
			command: a.SavedAndResultReady,
			success: $t.result.success,
			msg: $t.result.msg
		})), $t.result.shown || ($t.result.shown = !0, Globals.Bulk.isIframe || Globals.Bulk.isApi || (qt.isPaid || Globals.hasCreditsLeft ? $t.App.resultReady($t.result.success, $t.result.msg) : location.href = $t.downloadUrl())))
	}
	
	function Ct(e) {
		var t = !!a.DirtiesDrawCommandsSet[e.command];
		t && Xt++, t && Ut && (e.command != a.SetUserMask && e.command != a.SetHairMask || e.isDirtying) && (Bt = !0), e.index = Xt;
		o.send(e);
		e.command == a.GenerateResult && (Vt = !0), t && (T(), x())
	}
	
	function Rt() {
		Bt = !0, T(), x()
	}
	
	function xt(e) {
		e.image = {
			id: qt.id,
			secret: qt.secret
		}, e.saved = !$t.hasUnsavedChanges(), checkPostMessage(e)
	}
	var $t = {};
	u.sourceFunction = A, w.swordUpdated = St, v.shadowsUpdated = kt, v.setModel($t);
	var Tt = 1,
		At = 250;
	$t.imageCanvas = null, $t.previewCanvas = null, $t.userMask = null, $t.hairMask = null, $t.settings = {
		globalSmoothingLevel: 0,
		globalBlurLevel: 1,
		globalOffset: 0,
		rotateAngleDeg: 0,
		straightenAngleDeg: 0,
		brightness: 0,
		shadows: 0,
		highlights: 0,
		temperature: 0,
		useBrush: window.Globals.UseBrush,
		isAutoEdge: !0,
		backgroundColor: null,
		cropMode: a.CropUnconstrained,
		cropAspectRatio: null,
		cropTargetSize: null,
		cropAllowEnlarging: !1,
		cropFitToResult: !1,
		cropPaddingMils: 0,
		cropRect_o: g()
	}, $t.entryPoint = null, $t.boundingRect = null, $t.result = {
		ready: !1,
		success: !1,
		msg: null,
		shown: !1,
		posted: !1
	}, $t.imageSize = null, $t.stickySettings = {}, $t.defaultSettings = {}, $t.serverMaskCounts = {
		countForeground: 0,
		countBackground: 0
	}, $t.bezierSet = [];
	var Dt = [],
		It = 0,
		zt = 0,
		Ft = 0,
		Pt = 0,
		Et = g(),
		Bt = !1,
		Ut = !1,
		Lt = null,
		Gt = 1e4,
		_t = null,
		Ot = !1,
		Ht = !1,
		Nt = null,
		Wt = null,
		Xt = 0,
		Yt = 0,
		qt = null,
		Vt = !1,
		jt = null,
		Zt = null,
		Jt = null,
		Kt = null,
		Qt = !1,
		eo = function (e, t, o, n, r) {
			dt(e, t, o, n, r)
		},
		to = null,
		oo = null,
		no = null,
		ro = !0,
		ao = null,
		io = null,
		so = {
			hasImage: 0,
			hasThumbnail: 0,
			hasDrawCommands: 0
		},
		lo = ($t.hasUser = function () {
			return !!window.Globals.email
		}, null),
		uo = !1;
	$t.unhookBeforeunload = function () {
		$(window).off("beforeunload")
	}, $t.hasUnsavedChanges = function () {
		return Bt || Ot || 1 != so.hasImage || 1 != so.hasThumbnail || so.hasDrawCommands != $t.hasDrawCommands
	}, $t.checkSaveDrawCommands = function () {
		function o() {
			clearTimeout(Lt), Lt = setTimeout($t.checkSaveDrawCommands, Gt), T(), S()
		}
		if (console.log("M.checkSaveDrawCommands checking", Bt), clearTimeout(Lt), Ot) Ht = !0;
		else if (Bt) {
			Bt = !1;
			var n = D();
			if (console.log("M.checkSaveDrawCommands confirming", _t != n), _t != n) {
				console.log("M.checkSaveDrawCommands starting", Bt, _t != n), Ot = !0, T();
				var r = new Blob([n], {
					type: "application/json"
				});
				e.uploadS3WithRetry(r, qt.drawCommands, {
					label: "Saving edits",
					maxAge: !1,
					error: t.register,
					success: function (e) {
						t.deregister(e), _t = n, Ot = !1, 0 == $t.hasDrawCommands && ($t.hasDrawCommands = 1, mt()), Ht ? (Ht = !1, $t.checkSaveDrawCommands()) : o()
					}
				})
			} else o()
		} else o()
	};
	$t.create = function (o, n, a, i, s) {
		l.show(!0), window.Globals.showGuide ? b.start() : y.knockknock(), $t.entryPoint = s.newImage ? "create" : "duplicate", $t.hasImage = 0, $t.hasThumbnail = 0, $t.hasDrawCommands = 0, e.uploadS3WithRetry(o, i.image, {
			label: "Uploading original image",
			maxAge: 31536e3,
			progress: r.empty,
			error: t.register,
			success: function (e) {
				t.deregister(e), $t.hasImage = 1, x(), mt()
			}
		}), e.uploadS3WithRetry(a, i.thumbnail, {
			label: "Uploading thumbnail",
			maxAge: 31536e3,
			progress: r.empty,
			error: t.register,
			success: function (e) {
				t.deregister(e), $t.hasThumbnail = 1, x(), mt()
			}
		}), a = null, F(n, i, s), $t.defaultSettings.autoLevels && $t.colorLevelsAuto()
	}, $t.resume = function (e, t, o) {
		l.show(!1), y.knockknock(), $t.entryPoint = "resume", so.hasImage = $t.hasImage = 1, so.hasThumbnail = $t.hasThumbnail = 1, so.hasDrawCommands = $t.hasDrawCommands = t.hasDrawCommands, _t = JSON.stringify(o), F(e, t, o)
	};
	$t.setStickySettings = function (e, t) {
		if ("string" == typeof e) try {
			e = JSON.parse(e), "object" != typeof e && (console.log("Got weird settings, resetting", e), e = {})
		} catch (o) {
			console.log("Failed to parse sticky settings", e), e = {}
		}
		t && f.setStickySettings(JSON.stringify(e), function (e) {
			console.log(e), alert("Sorry, failed to save your sticky settings: " + e + "\n\nPlease try again and let us know if the error persists!")
		}, function () {}), $t.stickySettings = $.extend({}, e), $t.defaultSettings = $.extend({}, a.FactoryDefaults, $t.stickySettings)
	}, $t.tryUndo = function () {
		u.canUndo() && U(u.undo(), !0)
	}, $t.tryRedo = function () {
		u.canRedo() && U(u.redo(), !0)
	}, $t.eyeDrop = function (e, t) {
		c.tryAddColor($t.imageCanvas.context().getImageData(e, t, 1, 1).data, s.getActiveMode() == s.ForegroundEyeDropper)
	}, $t.drawSquare = function (e, t, o) {
		var n = s.getActiveMode();
		n.isEyeDropper ? $t.eyeDrop(e, t) : (u.schedulePush(), n.drawSquare(e, t, o), yt(a.DrawSquare, e, t, 0, 0, o))
	}, $t.drawLine = function (e, t, o) {
		var n = s.getActiveMode();
		if (n.isEyeDropper) $t.eyeDrop(e, t);
		else if (n.mask)
			if (u.schedulePush(), null == n.mask.lastX || null == n.mask.lastY) n.drawSquare(e, t, o), yt(a.DrawSquare, e, t, 0, 0, o);
			else {
				var r = n.mask.lastX,
					i = n.mask.lastY;
				n.drawLine(e, t, o), yt(a.DrawLine, r, i, e, t, o)
			}
	}, $t.clearUserMask = function () {
		u.push(), $t.userMask.clearAll(), wt(!0), w.clear(), i.main.refreshAllViews()
	}, $t.clearHairMask = function () {
		u.push(), $t.hairMask.clearAll(), vt(!0), i.main.refreshAllViews()
	}, $t.stepBackgroundColor = function (e) {
		var t = window.Globals.BackgroundColors.indexOf($t.settings.backgroundColor);
		0 > t && (t = 0);
		var o = window.Globals.BackgroundColors.length;
		t = e ? (t + o - 1) % o : (t + 1) % o, $t.setBackgroundColor(window.Globals.BackgroundColors[t], !0)
	}, $t.setBackgroundColor = function (e, t) {
		e = e || "rgba(255,255,255,0.000000)";
		var o = $('.background-color-swatch-button[data-color="' + e + '"]');
		0 == o.length && (o = $("#background-color-swatch-button-custom"), t ? (myLocalStorage.customColor = e, window.Globals.BackgroundColors[window.Globals.BackgroundColors.length - 1] = e) : z(e)), o.button("toggle");
		var n = $("#background-color-current-swatch");
		n.css("background-color", e), e != $t.settings.backgroundColor && (t && u.push(), $t.settings.backgroundColor = e, t && (ho(), i.main.refreshAllViews()))
	}, $t.setGlobalSmoothingLevel = function (e, t) {
		$("#global-smoothing-level-button-" + e).button("toggle"), e != $t.settings.globalSmoothingLevel && (t && u.push(), $t.settings.globalSmoothingLevel = e, L(), t && ho())
	}, $t.setGlobalBlurLevel = function (e, t) {
		$("#global-blur-level-button-" + e).button("toggle"), e != $t.settings.globalBlurLevel && (t && u.push(), $t.settings.globalBlurLevel = e, L(), t && ho())
	}, $t.setGlobalOffset = function (e, t) {
		$("#global-offset-button-" + e.toString().replace(".", "-")).button("toggle"), e != $t.settings.globalOffset && (t && u.push(), $t.settings.globalOffset = e, L(), t && ho())
	}, $t.setIsAutoEdge = function (e, t) {
		$("#is-auto-edge-button-" + e).button("toggle");
		var o = ".global-smoothing-level-button, .global-blur-level-button, .global-offset-button";
		e ? ($(o).attr("disabled", "disabled"), $(".manual-edge-label").addClass("light-gray")) : ($(o).removeAttr("disabled"), $(".manual-edge-label").removeClass("light-gray")), e != $t.settings.isAutoEdge && (t && u.push(), $t.settings.isAutoEdge = e, L(), t && ho())
	}, $t.getCrop_o = function () {
		return $t.settings.cropRect_o.isEmpty() ? Et : $t.settings.cropRect_o
	}, $t.setCrop_o = function (e, t) {
		return $t.settings.cropRect_o.equals(e) ? !1 : (t && u.push(), $t.settings.cropRect_o.setFrom(e), H(), t && ho(), !0)
	}, $t.setCropMode = function (e, t) {
		return e != $t.settings.cropMode ? (t && u.push(), $t.settings.cropMode = e, H(), t && ho(), !0) : !1
	}, $t.setCropPadding = function (e) {
		return e = Math.round(r.clamp(e, 0, At)), e != $t.settings.cropPaddingMils ? ($t.settings.cropPaddingMils = e, H(), !0) : !1
	}, $t.cropPaddingDecrease = function () {
		_(-Tt)
	}, $t.cropPaddingIncrease = function () {
		_(Tt)
	}, $t.setCropFitToResult = function (e, t) {
		return e != $t.settings.cropFitToResult ? (t && u.push(), $t.settings.cropFitToResult = e, H(), t && ho(), !0) : !1
	}, $t.setCropAllowEnlarging = function (e, t, o) {
		return e != $t.settings.cropAllowEnlarging || o && $t.settings.cropMode != a.CropTargetSize ? (t && u.push(), $t.settings.cropAllowEnlarging = e, o && ($t.settings.cropMode = a.CropTargetSize), H(), t && ho(), !0) : !1
	}, $t.setCropAspectRatio = function (e, t, o) {
		return !N($t.settings.cropAspectRatio, e) || o && $t.settings.cropMode != a.CropLockedAspectRatio ? (t && u.push(), $t.settings.cropAspectRatio = {
			w: e.w,
			h: e.h
		}, o && ($t.settings.cropMode = a.CropLockedAspectRatio), H(), t && ho(), !0) : !1
	}, $t.setCropTargetSize = function (e, t, o) {
		return !N($t.settings.cropTargetSize, e) || o && $t.settings.cropMode != a.CropTargetSize ? (t && u.push(), $t.settings.cropTargetSize = {
			w: e.w,
			h: e.h
		}, o && ($t.settings.cropMode = a.CropTargetSize), H(), t && ho(), !0) : !1
	}, $t.resetCrop = function () {
		var e = u.sourceFunction(),
			t = $t.setCropFitToResult(!1, !1),
			o = $t.setCropMode(a.CropUnconstrained, !1),
			n = $t.setCropAllowEnlarging(!1, !1, !1),
			r = $t.setCropPadding($t.defaultSettings.cropPaddingMils),
			i = $t.setCrop_o({
				top0: 0,
				right0: 0,
				bottom0: 0,
				left0: 0
			}, !1);
		(t || o || n || r || i) && (u.push(e), ho())
	}, $t.setRotateAngleDeg = function (e, t) {
		$t.settings.rotateAngleDeg != e && (t && u.push(), $t.settings.rotateAngleDeg = e, q(), t && ho())
	}, $t.rotateClockwise = function () {
		W(-90)
	}, $t.rotateCounterclockwise = function () {
		W(90)
	};
	var co = $t.rotateAngleRad = function () {
		return $t.settings.rotateAngleDeg * Math.PI / 180
	};
	$t.setStraightenAngleDeg = function (e) {
		$t.settings.straightenAngleDeg != e && ($t.settings.straightenAngleDeg = e, q())
	}, $t.straightenClockwise = function () {
		X(-.1)
	}, $t.straightenCounterclockwise = function () {
		X(.1)
	}, $t.straightenReset = function () {
		0 != $t.settings.straightenAngleDeg && (u.push(), $t.setStraightenAngleDeg(0), ho())
	}; {
		var po = $t.straightenAngleRad = function () {
			return $t.settings.straightenAngleDeg * Math.PI / 180
		};
		$t.totalRotationAngleRad = function () {
			return ($t.settings.rotateAngleDeg + $t.settings.straightenAngleDeg) * Math.PI / 180
		}
	}
	$t.setBrightness = function (e) {
		$t.settings.brightness = Math.round(r.clamp(e, -100, 100)), Q()
	}, $t.brightnessReset = function () {
		0 != $t.settings.brightness && (u.push(), $t.setBrightness(0), ho())
	}, $t.brightnessDecrement = function () {
		V(-1)
	}, $t.brightnessIncrement = function () {
		V(1)
	}, $t.setShadows = function (e) {
		$t.settings.shadows = Math.round(r.clamp(e, -100, 100)), Q()
	}, $t.shadowsReset = function () {
		0 != $t.settings.shadows && (u.push(), $t.setShadows(0), ho())
	}, $t.shadowsDecrement = function () {
		j(-1)
	}, $t.shadowsIncrement = function () {
		j(1)
	}, $t.setHighlights = function (e) {
		$t.settings.highlights = Math.round(r.clamp(e, -100, 100)), Q()
	}, $t.highlightsReset = function () {
		0 != $t.settings.highlights && (u.push(), $t.setHighlights(0), ho())
	}, $t.highlightsDecrement = function () {
		Z(-1)
	}, $t.highlightsIncrement = function () {
		Z(1)
	}, $t.setTemperature = function (e) {
		$t.settings.temperature = Math.round(r.clamp(e, -100, 100)), Q()
	}, $t.temperatureReset = function () {
		0 != $t.settings.temperature && (u.push(), $t.setTemperature(0), ho())
	}, $t.temperatureDecrement = function () {
		J(-1)
	}, $t.temperatureIncrement = function () {
		J(1)
	}, $t.colorLevelsResetAll = function () {
		(0 != $t.settings.brightness || 0 != $t.settings.shadows || 0 != $t.settings.highlights || 0 != $t.settings.temperature) && (u.push(), $t.settings.brightness = 0, $t.settings.shadows = 0, $t.settings.highlights = 0, $t.settings.temperature = 0, Q(), ho())
	}, $t.colorLevelsAuto = function () {
		null == io && (io = p(oo)), ($t.settings.highlights != io.highlights || $t.settings.shadows != io.shadows) && (u.push(), $t.settings.shadows = io.shadows, $t.settings.highlights = io.highlights, Q(), ho())
	};
	var go = $t.sendSetTool = function () {
			Ct({
				command: a.SetTool,
				toolMode: s.getActiveMode().key
			})
		},
		fo = $t.sendSetHairPalette = function (e) {
			Ct({
				command: a.SetHairPalette,
				paletteIndex: e + 1,
				paletteContents: c.pickle(e)
			})
		},
		ho = $t.sendSetGlobal = function () {
			Ct($.extend({
				command: a.SetGlobal,
				serverCropRect_o: $t.getCrop_o()
			}, $t.settings))
		},
		mo = $t.sendGenerateResult = function () {
			xt({
				command: a.GenerateResult
			});
			var e = D();
			e == lo && $t.result.ready && $t.result.success ? ot({
				response: a.ResultReady,
				success: !0,
				msg: null
			}) : (lo = e, $t.result.ready = !1, ho(), Ct({
				command: a.GenerateResult
			})), $t.checkSaveDrawCommands()
		};
	return $t.skip = function () {
		xt({
			command: a.Skip
		}), $t.checkSaveDrawCommands()
	}, $t.sendSaveServerMask = function () {
		Ct({
			command: a.SaveServerMask
		})
	}, $t.downloadUrl = function () {
		return d.downloadUrl(qt.id, qt.secret)
	}, $t.shareUrl = function () {
		return d.shareUrl(qt.id, qt.secret)
	}, $t.surveyUrl = function () {
		return d.surveyUrl(qt.id, qt.secret)
	}, $t.getFilename = function () {
		return qt.originalFilename || "Unknown Filename"
	}, window.M = $t, $t
}), define("cropapp", ["util", "viewport", "model", "const", "toolmode", "undo", "croprect"], function (e, t, o, n, r, a, i) {
	function s(e) {
		var t = $(document.createElement("li"));
		t.addClass("divider"), e.append(t)
	}
	
	function l(e, o, n) {
		var r = $(document.createElement("li")),
			a = $(document.createElement("a"));
		return a.attr("href", "#"), a.text(o), a.click(function (e) {
			n(), t.subapp.animateZoomToFit(), e.preventDefault()
		}), r.append(a), e.append(r), a
	}
	
	function u(t) {
		l(t, "Custom", function () {
			e.modal("#crop-app-aspect-ratio-lightbox")
		})
	}
	
	function c(e, t) {
		l(e, h(t), function () {
			o.setCropAspectRatio(t, !0, !0)
		})
	}
	
	function d(t) {
		l(t, "Custom", function () {
			e.modal("#crop-app-target-size-lightbox")
		})
	}
	
	function p(e, t) {
		l(e, m(t), function () {
			o.setCropTargetSize(t, !0, !0)
		})
	}
	
	function g(e) {
		o.setCropMode(e, !0), t.subapp.animateZoomToFit()
	}
	
	function f() {
		$("#crop-app-sidebar").hide(), $("#subapp-lightbox").modal("hide"), M = t.subapp.showing = !1, v.onhide()
	}
	
	function h(t) {
		return e.toFixed(t.w, 3) + ":" + e.toFixed(t.h, 3)
	}
	
	function m(t) {
		return t.w.toFixed(0) + " x " + t.h.toFixed(0) + "px (" + h(e.fuzzyAspectRatio(t)) + ")"
	}
	
	function w() {
		var e = t.subapp.getMouse_c(),
			o = t.subapp.getCrop_c();
		if (Math.abs(o.centerX() - e.x) <= y && Math.abs(o.centerY() - e.y) <= y) return r.ResizeMove;
		if (e.x > o.left0 - y && e.x < o.right0 + y && e.y > o.top0 - y && e.y < o.bottom0 + y) {
			var n = e.x < o.left0 + y,
				a = e.x > o.right0 - y,
				i = e.y < o.top0 + y,
				s = e.y > o.bottom0 - y;
			if (n) return i ? r.ResizeTopLeft : s ? r.ResizeBottomLeft : r.ResizeLeft;
			if (a) return i ? r.ResizeTopRight : s ? r.ResizeBottomRight : r.ResizeRight;
			if (i) return r.ResizeTop;
			if (s) return r.ResizeBottom
		}
		return r.Grab
	}
	var v = {},
		b = {
			isVisible: !0,
			showPreview: !0,
			showFrame: !0,
			showBackground: !0,
			title: "",
			borderRight: !1,
			borderLeft: !1,
			clip: !1
		},
		y = 20,
		S = 150,
		k = !1,
		M = !1;
	v.onhide = e.empty, v.show = function () {
		if (!k) {
			k = !0, $("#crop-app-close-button").click(f), $("#crop-app-bottom-close-button").click(f), $("#crop-app-mode-unconstrained").click(function () {
				g(n.CropUnconstrained)
			}), $("#crop-app-mode-locked-aspect-ratio").click(function () {
				g(n.CropLockedAspectRatio)
			}), $("#crop-app-mode-target-size").click(function () {
				g(n.CropTargetSize)
			}), e.mouseDownRepeater($("#crop-app-padding-decrease-button"), function () {
				o.cropPaddingDecrease(), t.subapp.zoomToFit()
			}, S, a.schedulePush, o.sendSetGlobal), e.mouseDownRepeater($("#crop-app-padding-increase-button"), function () {
				o.cropPaddingIncrease(), t.subapp.zoomToFit()
			}, S, a.schedulePush, o.sendSetGlobal), $("#crop-app-fit-to-result-button").click(function () {
				o.setCropFitToResult(!o.settings.cropFitToResult, !0), t.subapp.animateZoomToFit()
			}), $("#crop-app-reset-button").click(function () {
				o.resetCrop(), t.subapp.animateZoomToFit()
			}), $("#crop-app-allow-enlarging-result").click(function () {
				o.setCropAllowEnlarging(!o.settings.cropAllowEnlarging, !0, !0), t.subapp.animateZoomToFit()
			});
			var i = t.subapp.repeaterDelay;
			e.mouseDownRepeater($("#crop-app-zoom-in"), t.subapp.animateZoomInAboutCenter, i), e.mouseDownRepeater($("#crop-app-zoom-out"), t.subapp.animateZoomOutAboutCenter, i), $("#crop-app-zoom-to-fit").mousedown(function (e) {
				e.shiftKey ? t.subapp.zoomToFitTight() : t.subapp.animateZoomToFit()
			});
			var l = $("#crop-app-locked-aspect-ratio-list");
			l.empty();
			for (var h = 0; h < n.AspectRatios.length; h++) c(l, n.AspectRatios[h]);
			var m = e.fuzzyAspectRatio(o.imageSize);
			n.AspectRatios.indexOf(m) < 0 && (s(l), c(l, m)), s(l), u(l), $("#crop-app-aspect-ratio-ok-button").click(function () {
				var e = {
						w: parseFloat($("#crop-app-aspect-ratio-w").val()),
						h: parseFloat($("#crop-app-aspect-ratio-h").val())
					},
					n = e.w <= 0 || isNaN(e.w),
					r = e.h <= 0 || isNaN(e.h);
				r || n || (e.h / e.w > 10 || e.w / e.h > 10) && (n = r = !0), $("#crop-app-aspect-ratio-w-fg").toggleClass("has-error", n), $("#crop-app-aspect-ratio-h-fg").toggleClass("has-error", r), n || r || (o.setCropAspectRatio(e, !0, !0), $("#crop-app-aspect-ratio-lightbox").modal("hide"), t.subapp.animateZoomToFit())
			});
			var w = $("#crop-app-target-size-list");
			w.empty();
			var y = o.imageSize;
			p(w, y), s(w), d(w), $("#crop-app-target-size-ok-button").click(function () {
				var e = {
						w: parseInt($("#crop-app-target-size-w").val()),
						h: parseInt($("#crop-app-target-size-h").val())
					},
					n = e.w < 1 || isNaN(e.w) || e.w > window.Globals.MaxOutputWidth,
					r = e.h < 1 || isNaN(e.h) || e.h > window.Globals.MaxOutputWidth;
				$("#crop-app-target-size-w-fg").toggleClass("has-error", n), $("#crop-app-target-size-h-fg").toggleClass("has-error", r), n || r || (o.setCropTargetSize(e, !0, !0), $("#crop-app-target-size-lightbox").modal("hide"), t.subapp.animateZoomToFit())
			})
		}
		r.Grab.pick(), $(".subapp-sidebar").hide(), $("#crop-app-sidebar").show(), e.modal("#subapp-lightbox"), t.subapp.setViewConfigAndShow(b, v), M = !0, v.updateDisplay()
	}, v.keyDownHandler = function (e) {
		switch (e.keyCode) {
			case 27:
				f()
		}
		return !0
	}, v.updateDisplay = function () {
		if (M) {
			var e = o.settings.cropAspectRatio;
			$("#crop-app-locked-aspect-ratio-display").text(h(e));
			var t = o.settings.cropTargetSize;
			$("#crop-app-target-size-display").text(m(t));
			var r = o.settings.cropMode;
			r == n.CropUnconstrained ? $("#crop-app-mode-unconstrained").prop("checked", !0) : r == n.CropLockedAspectRatio ? $("#crop-app-mode-locked-aspect-ratio").prop("checked", !0) : r == n.CropTargetSize && $("#crop-app-mode-target-size").prop("checked", !0), $("#crop-app-padding-display").text("" + (.1 * o.settings.cropPaddingMils).toFixed(1) + "%"), $("#crop-app-fit-to-result-button").toggleClass("active", o.settings.cropFitToResult);
			var a = o.getCrop_o(),
				i = o.settings.cropTargetSize,
				s = null;
			s = m(o.settings.cropMode == n.CropTargetSize && null != i && (o.settings.cropAllowEnlarging || i.w < a.width() || i.h < a.height()) ? i : {
				w: a.width(),
				h: a.height()
			}), $("#crop-app-output-size-display").text(s), $("#crop-app-allow-enlarging-result").prop("checked", o.settings.cropAllowEnlarging)
		}
	};
	var C = null,
		R = i(),
		x = !1;
	v.mouseDownHandler = function (e) {
		r.isNot(r.Grab) && e.which == n.MouseButtonLeft && (x = !1, C = i(o.getCrop_o()))
	}, v.mouseMoveHandler = function (e) {
		var i = null;
		if (t.subapp.getMouseIsDown() ? i = r.getActiveMode() : (i = w(), r.setTempSelect(i)), r.isNot(r.Grab) && t.subapp.getMouseIsDown() && e.which == n.MouseButtonLeft) {
			x || (x = !0, o.settings.cropFitToResult ? o.setCropFitToResult(!1, !0) : a.push());
			var s = t.subapp.getZoomScale(),
				l = t.subapp.getClick_c(),
				u = (e.pageX - l.x) / s,
				c = (e.pageY - l.y) / s;
			if (R.setFrom(C), i == r.ResizeMove) R.left0 += u, R.right0 += u, R.top0 += c, R.bottom0 += c;
			else {
				var d = null;
				o.settings.cropMode == n.CropLockedAspectRatio ? d = o.settings.cropAspectRatio : o.settings.cropMode == n.CropTargetSize && (d = o.settings.cropTargetSize);
				var p = d ? d.w / d.h : 0,
					g = d ? d.h / d.w : 0;
				i == r.ResizeTop ? (R.top0 = C.top0 + c, d && (R.left0 = C.left0 + c * p / 2, R.right0 = C.right0 - c * p / 2)) : i == r.ResizeTopRight ? (R.top0 = C.top0 + c, R.right0 = C.right0 + u, d && (R.y2x() > p ? R.top0 = C.top0 - u * g : R.right0 = C.right0 - c * p)) : i == r.ResizeRight ? (R.right0 = C.right0 + u, d && (R.top0 = C.top0 - u * g / 2, R.bottom0 = C.bottom0 + u * g / 2)) : i == r.ResizeBottomRight ? (R.bottom0 = C.bottom0 + c, R.right0 = C.right0 + u, d && (R.y2x() > p ? R.bottom0 = C.bottom0 + u * g : R.right0 = C.right0 + c * p)) : i == r.ResizeBottom ? (R.bottom0 = C.bottom0 + c, d && (R.left0 = C.left0 - c * p / 2, R.right0 = C.right0 + c * p / 2)) : i == r.ResizeBottomLeft ? (R.bottom0 = C.bottom0 + c, R.left0 = C.left0 + u, d && (R.y2x() > p ? R.bottom0 = C.bottom0 - u * g : R.left0 = C.left0 - c * p)) : i == r.ResizeLeft ? (R.left0 = C.left0 + u, d && (R.top0 = C.top0 + u * g / 2, R.bottom0 = C.bottom0 - u * g / 2)) : i == r.ResizeTopLeft && (R.top0 = C.top0 + c, R.left0 = C.left0 + u, d && (R.y2x() > p ? R.top0 = C.top0 + u * g : R.left0 = C.left0 + c * p))
			}
			o.setCrop_o(R, !1), t.subapp.refreshAllViews()
		}
	}, v.mouseUpHandler = function () {
		x && o.sendSetGlobal()
	}, v.mouseWheelHandler = e.empty;
	var T = 20,
		A = 6,
		D = T - 2,
		I = A - 2;
	return v.drawOver_i = e.empty, v.drawUnder_i = e.empty, v.drawOver_c = function (e, o) {
		function n(e, t, n, a, i) {
			var s = r.is(i);
			o.fillStyle = s ? "#ffffff" : "#ffffff", o.fillRect(e + n, t + a, n * T, a * A), o.fillRect(e + n, t + a, n * A, a * T), o.fillStyle = s ? "#ff0000" : "#000000", o.fillRect(e + 2 * n, t + 2 * a, n * D, a * I), o.fillRect(e + 2 * n, t + 2 * a, n * I, a * D)
		}
		
		function a(e, t, n, a) {
			var i = r.is(a);
			o.fillStyle = i ? "#ffffff" : "#ffffff", o.fillRect(e + n, t - T / 2, n * A, T), o.fillStyle = i ? "#ff0000" : "#000000", o.fillRect(e + 2 * n, t - D / 2, n * I, D)
		}
		
		function i(e, t, n, a) {
			var i = r.is(a);
			o.fillStyle = i ? "#ffffff" : "#ffffff", o.fillRect(e - T / 2, t + n, T, n * A), o.fillStyle = i ? "#ff0000" : "#000000", o.fillRect(e - D / 2, t + 2 * n, D, n * I)
		}
		
		function s(e, t, n) {
			var a = y - 2,
				i = r.is(n);
			o.fillCircle(e, t, a, "#FFFFFF"), o.fillCircle(e, t, a - 1, i ? "#ff0000" : "#000000")
		}
		o.globalAlpha = 1, o.lineJoin = "miter", o.lineCap = "square";
		var l = t.subapp.getCrop_c();
		n(l.left0, l.top0, 1, 1, r.ResizeTopLeft), n(l.right0, l.top0, -1, 1, r.ResizeTopRight), n(l.right0, l.bottom0, -1, -1, r.ResizeBottomRight), n(l.left0, l.bottom0, 1, -1, r.ResizeBottomLeft), a(l.left0, Math.round(l.centerY()), 1, r.ResizeLeft), a(l.right0, Math.round(l.centerY()), -1, r.ResizeRight), i(Math.round(l.centerX()), l.top0, 1, r.ResizeTop), i(Math.round(l.centerX()), l.bottom0, -1, r.ResizeBottom), s(Math.round(l.centerX()), Math.round(l.centerY()), r.ResizeMove)
	}, v
}), define("stickysettings", ["util", "model", "const"], function (e, t, o) {
	function n() {
		if (!f) {
			f = !0;
			for (var e in v) i(e);
			$("#sticky-setting-reset-all-current-button").click(s), $("#sticky-setting-reset-all-factory-button").click(l)
		}
	}
	
	function r(e, n) {
		var r = $.extend({}, t.stickySettings);
		"undefined" == typeof n || n === o.FactoryDefaults[e] ? delete r[e] : r[e] = n, t.setStickySettings(r, !0), p()
	}
	
	function a(e) {
		var o = v[e];
		return o.getter ? o.getter() : t.settings[e]
	}
	
	function i(e) {
		$("#sticky-setting-" + e + "-current-button").click(function () {
			r(e, a(e))
		}), $("#sticky-setting-" + e + "-factory-button").click(function () {
			r(e)
		})
	}
	
	function s() {
		var e = {};
		for (var n in v) {
			var r = a(n);
			r != o.FactoryDefaults[n] && (e[n] = r)
		}
		t.setStickySettings(e, !0), p()
	}
	
	function l() {
		t.setStickySettings({}, !0), p()
	}
	
	function u(e) {
		return h.hasOwnProperty(e) ? h[e] : null
	}
	
	function c(e) {
		return m.hasOwnProperty(e) ? m[e] : null
	}
	
	function d(e) {
		return w.hasOwnProperty(e) ? w[e] : null
	}
	
	function p() {
		var e = !1,
			n = !1;
		for (var r in v) {
			var i = v[r],
				s = i.display(a(r)),
				l = i.display(o.FactoryDefaults[r]),
				p = t.stickySettings.hasOwnProperty(r) ? i.display(t.stickySettings[r]) : "";
			u(r) != s && $("#sticky-setting-" + r + "-current-display").html(s), c(r) != p && $("#sticky-setting-" + r + "-sticky-display").html(p), d(r) != l && $("#sticky-setting-" + r + "-factory-display").html(l), h[r] = s, m[r] = p, w[r] = l;
			var g = s == p || "" == p && s == l || !t.hasUser(),
				f = "" == p || !t.hasUser();
			e = e || !g, n = n || !f, $("#sticky-setting-" + r + "-current-button").toggleClass("disabled", g), $("#sticky-setting-" + r + "-factory-button").toggleClass("disabled", f)
		}
		$("#sticky-setting-reset-all-current-button").toggleClass("disabled", !e), $("#sticky-setting-reset-all-factory-button").toggleClass("disabled", !n)
	}
	var g = {},
		f = !1,
		h = {},
		m = {},
		w = {},
		v = {
			brushSize: {
				display: function (e) {
					return e + "px"
				},
				getter: function () {
					return window.Globals.BrushSize
				}
			},
			backgroundColor: {
				display: function (e) {
					var t = e ? e : "rgba(255,255,255,0.000000)";
					return '<div><span class="background-color-swatch swatch popover-button-label checker-gif" style="position:absolute;"></span><span class="background-color-swatch swatch popover-button-label" id="background-color-current-swatch" style="position: relative; background-color: ' + t + ';"></span></div>'
				}
			},
			cropMode: {
				display: function (e) {
					switch (e) {
						case o.CropUnconstrained:
							return "Unconstrained";
						case o.CropLockedAspectRatio:
							return "Locked Aspect Ratio";
						case o.CropTargetSize:
							return "Target Size"
					}
				}
			},
			cropFitToResult: {
				display: function (e) {
					return e ? "On" : "Off"
				}
			},
			cropPaddingMils: {
				display: function (e) {
					return "" + e / 10 + "%"
				}
			},
			cropAspectRatio: {
				display: function (t) {
					return t ? e.toFixed(t.w, 3) + ":" + e.toFixed(t.h, 3) : "(from input image)"
				}
			},
			cropTargetSize: {
				display: function (e) {
					return e ? e.w.toFixed(0) + " x " + e.h.toFixed(0) + "px" : "(from input image)"
				}
			},
			cropAllowEnlarging: {
				display: function (e) {
					return e ? "On" : "Off"
				}
			},
			globalBlurLevel: {
				display: function (e) {
					return "" + e + "px"
				}
			},
			globalSmoothingLevel: {
				display: function (e) {
					return "" + e
				}
			},
			globalOffset: {
				display: function (e) {
					return "" + e + "px"
				}
			},
			isAutoEdge: {
				display: function (e) {
					return e ? "Auto" : "Custom"
				}
			},
			autoLevels: {
				display: function (e) {
					return e ? "On" : "Off"
				},
				getter: function () {
					return !0
				}
			}
		};
	return g.show = function () {
		return n(), p(), e.modal("#sticky-settings-lightbox"), !1
	}, g
}), define("app", ["util", "canvasex", "viewport", "model", "const", "tutorial", "toolmode", "undo", "hairpalettes", "cropapp", "shadowapp", "stickysettings", "sword"], function (e, t, o, n, r, a, i, s, l, u, c, d, p) {
	function g() {
		$(".navbar").hide(), $(".footer").hide(), $(".container >").hide(), $("#app-wrapper").show(), $("html").addClass("html-app-mode"), o.main.showing = !0
	}
	
	function f() {
		T || (T = !0, o.subapp.initialize({
			image: S,
			canvasDiv: $("#subapp-view"),
			viewConfigs: [I]
		}))
	}
	
	function h(e) {
		window.Globals.BrushSize = e, $("#brush-size-current").text(e + "px"), $("#brush-size-button-" + e).button("toggle")
	}
	
	function m(e, t) {
		return function () {
			var n = $(e),
				r = $(t),
				a = n.hasClass("active");
			return $(".popover-button").removeClass("active"), $(".exclusive-group.popover").hide(), a || (n.addClass("active"), r.show()), o.main.refreshAllViews(), !1
		}
	}
	
	function w(e) {
		return C ? o.subapp.keyUpHandler(e) ? void 0 : void 0 : void o.main.keyUpHandler(e)
	}
	
	function v(e) {
		if (!e.altKey && !e.metaKey) {
			if (C) {
				if (o.subapp.keyDownHandler(e)) return;
				if (C.keyDownHandler(e)) return
			}
			if (!o.main.keyDownHandler(e)) switch (e.keyCode) {
				case 27:
					p.mouseCancel(), o.refreshAllViews(), a.hide();
					break;
				case 112:
					a.toggle(), e.preventDefault();
					break;
				case 32:
					i.select(i.getSelectedMode() == i.Background ? i.Foreground : i.Background), e.preventDefault();
					break;
				case 88:
					i.select(i.getSelectedMode() == i.MaskEraser ? i.Grab : i.MaskEraser);
					break;
				case 66:
					n.stepBackgroundColor(e.shiftKey);
					break;
				case 67:
					window.Globals.UseHair && i.select(i.getSelectedMode() == i.HairEraser ? i.Grab : i.HairEraser);
					break;
				case 69:
					window.Globals.UseHair && i.select(i.getSelectedMode() == i.ForegroundEyeDropper ? i.BackgroundEyeDropper : i.ForegroundEyeDropper);
					break;
				case 86:
					if (window.Globals.UseHair) {
						var t = i.PaintHairs.indexOf(i.getSelectedMode());
						if (t >= 0) {
							var r = i.PaintHairs.length;
							t = e.shiftKey ? (t + r - 1) % r : (t + 1) % r
						} else t = l.getPaletteIndex();
						i.select(i.PaintHairs[t])
					}
					break;
				case 84:
					n.sendSaveServerMask();
					break;
				case 83:
					i.select(i.getSelectedMode() == i.Sword ? i.Grab : i.Sword)
			}
		}
	}
	
	function b() {
		return $("#rotate-button").hasClass("active")
	}
	var y = {},
		S = null,
		k = 0,
		M = 0,
		C = null,
		R = null,
		x = $(".canvas-view"),
		T = !1,
		A = {
			isVisible: !0,
			showOriginal: !0,
			title: "Original",
			borderRight: !0,
			borderLeft: !1,
			clip: !1
		},
		D = {
			isVisible: !0,
			showOriginal: !0,
			showUserMask: !0,
			showHairMask: window.Globals.UseHair,
			showEyeDropperLoupe: window.Globals.UseHair,
			showSword: !0,
			showBeziers: !0,
			title: "Original + Marks",
			borderRight: !0,
			borderLeft: r.IncludeOriginal,
			clip: !1,
			showHoverTool: !0
		},
		I = {
			isVisible: !0,
			showPreview: !0,
			showFrame: !0,
			showBackground: !0,
			showHairEraserLoupe: window.Globals.UseHair,
			title: "Result",
			borderRight: !1,
			borderLeft: !0,
			clip: !0,
			panModeOnly: !0,
			showHoverTool: !r.ScreenshotMode
		},
		z = [D, I];
	r.IncludeOriginal && z.unshift(A), y.initialized = !1, y.imageUpdated = function () {
		g(), D.filename = n.getFilename(), S = n.imageCanvas, k = S.width, M = S.height, R = $("#app-view"), r.IncludeOriginal && R.css("width", "941px"), r.ScreenshotMode && ($("#viewport-debug-group").show(), $("#viewport-set").click(function () {
			o.main.fromString($("#viewport-setting").val())
		})), o.main.initialize({
			image: S,
			canvasDiv: R,
			viewConfigs: z,
			showGrid: b,
			app: y
		}), $("#app-toolbar, #app-bottom-toolbar").mouseover(o.main.releaseTempSelectIfMouseNotDown), $(window).keydown(v), $(window).keyup(w);
		var t = o.main.repeaterDelay;
		e.mouseDownRepeater($("#zoom-in"), o.main.animateZoomInAboutCenter, t), e.mouseDownRepeater($("#zoom-out"), o.main.animateZoomOutAboutCenter, t), $("#zoom-to-fit").mousedown(function (e) {
			e.shiftKey ? o.main.zoomToFitTight() : o.main.animateZoomToFit()
		}), $("#clear-user-mask-tool").click(function () {
			n.clearUserMask(), i.is(i.Sword) && i.Grab.pick()
		}), $("#clear-hair-mask-tool").click(function () {
			n.clearHairMask()
		});
		for (var p = ["brush-size", "background-color", "blur-offset-smooth", "hair-handling", "rotate", "color-levels"], x = 0; x < p.length; x++) {
			var T = "#" + p[x] + "-button";
			$(T).click(m(T, "#" + p[x] + "-popover"))
		}
		$("#save").click(n.checkSaveDrawCommands), $("#download").click(function () {
			U(), n.sendGenerateResult(), !Globals.Bulk.isIframe && !Globals.Bulk.isApi || Globals.Bulk.isApiSingle ? e.modal("#result-dialog") : setTimeout(e.modal, 500, "#result-dialog")
		}), $("#skip").click(n.skip), $(".undo").click(n.tryUndo), $(".redo").click(n.tryRedo), $("#rotate-clockwise").click(n.rotateClockwise), $("#rotate-counterclockwise").click(n.rotateCounterclockwise), e.mouseDownRepeater($("#straighten-clockwise"), n.straightenClockwise, 30, s.push, n.sendSetGlobal), e.mouseDownRepeater($("#straighten-counterclockwise"), n.straightenCounterclockwise, 30, s.push, n.sendSetGlobal), $("#straighten-reset").click(n.straightenReset);
		var A = 30;
		$("#brightness-reset").click(n.brightnessReset), e.mouseDownRepeater($("#brightness-decrease"), n.brightnessDecrement, A, s.push, n.sendSetGlobal), e.mouseDownRepeater($("#brightness-increase"), n.brightnessIncrement, A, s.push, n.sendSetGlobal), $("#shadows-reset").click(n.shadowsReset), e.mouseDownRepeater($("#shadows-decrease"), n.shadowsDecrement, A, s.push, n.sendSetGlobal), e.mouseDownRepeater($("#shadows-increase"), n.shadowsIncrement, A, s.push, n.sendSetGlobal), $("#highlights-reset").click(n.highlightsReset), e.mouseDownRepeater($("#highlights-decrease"), n.highlightsDecrement, A, s.push, n.sendSetGlobal), e.mouseDownRepeater($("#highlights-increase"), n.highlightsIncrement, A, s.push, n.sendSetGlobal), $("#temperature-reset").click(n.temperatureReset), e.mouseDownRepeater($("#temperature-decrease"), n.temperatureDecrement, A, s.push, n.sendSetGlobal), e.mouseDownRepeater($("#temperature-increase"), n.temperatureIncrement, A, s.push, n.sendSetGlobal), $("#color-levels-auto").click(n.colorLevelsAuto), $("#color-levels-reset").click(n.colorLevelsResetAll), $(".sticky-settings").click(d.show), $("#show-crop-app-button").click(function () {
			C = u, f(), u.show()
		}), $("#show-shadow-app-button").click(function () {
			C = c, f(), c.show()
		}), u.onhide = c.onhide = function () {
			i.releaseTempSelect(), i.Grab.pick(), C = null
		}, F(), i.setCallbacks(B, E), i.Background.mask = n.userMask, i.Foreground.mask = n.userMask, i.MaskEraser.mask = n.userMask, i.HairEraser.mask = n.hairMask;
		for (var I = 0; I < i.PaintHairs.length; I++) i.PaintHairs[I].mask = n.hairMask;
		"create" == n.entryPoint ? i.Foreground.pick() : i.Grab.pick(), l.updatePaletteIndex(i.PaintHair1), o.main.zoomToFit(!1), o.main.updateSize(), o.main.zoomToFit(!0), $(".global-smoothing-level-button").click(function (e) {
			n.setGlobalSmoothingLevel(parseInt($(e.currentTarget).data("level")), !0)
		}), $(".global-blur-level-button").click(function (e) {
			n.setGlobalBlurLevel(parseInt($(e.currentTarget).data("level")), !0)
		}), $(".background-color-swatch-button").click(function (e) {
			n.setBackgroundColor($(e.currentTarget).data("color"), !0)
		}), $(".brush-size-button").click(function (e) {
			h(parseInt($(e.currentTarget).data("size")))
		}), $(".global-offset-button").click(function (e) {
			n.setGlobalOffset(parseFloat($(e.currentTarget).data("offset")), !0)
		}), $(".is-auto-edge-button").click(function (e) {
			n.setIsAutoEdge($(e.currentTarget).data("isautoedge"), !0)
		}), h(n.defaultSettings.brushSize), y.initialized = !0, a.initialize()
	};
	var F = y.updateUndoRedoState = function () {
		s.canUndo() ? $(".undo").removeAttr("disabled") : $(".undo").attr("disabled", "disabled"), s.canRedo() ? $(".redo").removeAttr("disabled") : $(".redo").attr("disabled", "disabled")
	};
	s.stateUpdated = F;
	var P = "",
		E = function (t) {
			return t == i.Sword ? n.serverMaskCounts.countForeground > 0 && n.serverMaskCounts.countBackground > 0 ? !0 : (e.modal("#red-green-before-sword-dialog", !0), !1) : !0
		},
		B = function (e) {
			x.removeClass(P).addClass(P = e.cssClass), l.updatePaletteIndex(e), o.main.refreshAllViews(), n.sendSetTool()
		};
	y.mouseDownHandler = function (e) {
		if (i.isNot(i.Grab) && e.which == r.MouseButtonLeft)
			if (i.is(i.Sword)) p.mouseDown(o.main.getMouse_i());
			else {
				var t = o.main.getMouse_ii();
				n.drawSquare(t.x, t.y, o.main.diameter())
			}
	}, y.mouseMoveHandler = function (e) {
		if (i.isNot(i.Grab) && i.isNot(i.Sword) && o.main.getMouseIsDown() && e.which == r.MouseButtonLeft) {
			var t = o.main.getMouse_ii();
			n.drawLine(t.x, t.y, o.main.diameter())
		}
		i.is(i.Sword) && p.mouseMove(o.main.getMouse_i(), o.main.getZoomScale())
	}, y.mouseUpHandler = function (e) {
		i.is(i.Sword) && e.which == r.MouseButtonLeft && p.mouseUp(o.main.getMouse_i())
	}, y.mouseWheelHandler = function () {
		i.is(i.Sword) && p.mouseWheel(o.main.getMouse_i(), o.main.getZoomScale())
	}, y.drawOver_c = e.empty, y.drawOver_i = e.empty, y.drawUnder_i = e.empty, y.setSaveState = function (e) {
		var t = $("#save");
		e == r.SaveSave ? t.removeClass("disabled").addClass("btn-info") : e == r.SaveSaving ? t.addClass("disabled").addClass("btn-info") : e == r.SaveSaved && t.addClass("disabled").removeClass("btn-info")
	}, y.setLightState = function (e) {
		e == r.LightUpdated ? $("#download").removeAttr("disabled") : $("#download").attr("disabled", "disabled"), $("#light-progress").toggle(e == r.LightProgress), $("#light-progress-2").toggle(e == r.LightProgress), $("#light-connecting").toggle(e == r.LightConnecting), $("#light-updating").toggle(e == r.LightUpdating), $("#light-updated").toggle(e == r.LightUpdated), R.toggleClass("busy", e != r.LightUpdated)
	};
	var U = y.resultPending = function (e, t) {
		$("#result-dialog-waiting-msg").text(e || "Requesting result generation. "), $("#result-dialog-waiting-bar").css("width", (t || "5") + "%"), $("#result-dialog-waiting").show(), $("#result-dialog-ready").hide(), $("#result-dialog-error").hide()
	};
	return y.resultReady = function (e, t) {
		$("#result-dialog-waiting").hide(), e ? ($("#result-dialog-download-link").attr("href", n.downloadUrl()), $("#result-dialog-share-link").attr("href", n.shareUrl()), $("#result-dialog-ready").show()) : ($("#result-dialog-error-msg").text(t), $("#result-dialog-error").show())
	}, y.getToolMode = function () {
		return i.getSelectedMode()
	}, y
}), define("filedownloader", ["util"], function (e) {
	{
		var t = {},
			o = {
				url: "",
				withCredentials: !1,
				progress: e.empty,
				error: function (e) {
					alert(e)
				},
				success: e.empty,
				contentType: null
			};
		t.download = function (e) {
			var t = $.extend({}, o, e),
				n = new XMLHttpRequest,
				r = 0;
			n.onprogress = function (e) {
				if (e.lengthComputable) {
					var o = Math.round(100 * e.loaded / e.total);
					r !== o && (r = o, t.progress(r))
				}
			}, n.onerror = function (e) {
				console.log("FileDownloader upload.onerror", e), t.error(e)
			}, n.onabort = function (e) {
				console.log("FileDownloader upload.onabort", e), t.error(e)
			}, t.withCredentials && (n.withCredentials = t.withCredentials), n.onload = function () {
				if (n.response)
					if (n.status < 200 || n.status > 299) console.log("FileDownloader onload error", n), t.error("Failed to fetch " + t.url + ": " + n.statusText + " [" + n.status + "]");
					else {
						var e = t.contentType || n.getResponseHeader("Content-Type"),
							o = n.response,
							r = new Blob([o], {
								type: e
							});
						t.success(r)
					}
			}, n.open("GET", t.url, !0), n.responseType = "arraybuffer", n.send()
		}
	}
	return t
}), define("bulkupload", ["const", "util", "canvasex", "webapi", "fileuploader", "retrydialog"], function (e, t, o, n, r, a) {
	function i() {
		return w.length > 0 || v.length > 0 ? "Uploads still in progress - closing the page will abort them." : void 0
	}
	
	function s(e) {
		var t = $(document.createElement("tr")),
			o = $(document.createElement("td")),
			n = $(document.createElement("div"));
		n.attr({
			style: "margin-bottom: 0;",
			"class": "progress progress-striped"
		}), o.append(n);
		var r = $(document.createElement("div"));
		r.attr({
			style: "width: 0;",
			"class": "progress-bar"
		}), n.append(r);
		var a = $(document.createElement("td"));
		return t.append($(document.createElement("td")).text(e.name)), t.append(o), t.append(a), $("#bulk-dialog-body-header").after(t), a.attr("class", "pending").text("Pending..."), {
			file: e,
			tr: t,
			progressContainerEl: o,
			progressEl: r,
			statusEl: a
		}
	}
	
	function l() {
		if (v.length > 0 && w.length < m) {
			var e = v.shift();
			w.push(e), g(e), l()
		}
	}
	
	function u(e) {
		e.progressContainerEl.empty().text("Already queued, ignored"), e.statusEl.text("Duplicate").attr("class", "hair b")
	}
	
	function c(e, t, o) {
		console.log("error", t, e), e.progressContainerEl.empty().text(t), o ? (e.statusEl.html("<span class='bg b'>Error</span> <small class='i'>(<a href='#'>Retry</a>)</small>").click(function () {
			return e.statusEl.off("click"), e.tr.remove(), v.push(s(e.file)), l(), !1
		}), p(e)) : e.statusEl.text("Error").attr("class", "bg b")
	}
	
	function d(e) {
		console.log("success", e), e.statusEl.text("Ok").attr("class", "fg b"), y.attr("class", "btn btn-primary"), p(e)
	}
	
	function p(e) {
		console.log("completed", e);
		var t = w.indexOf(e);
		t >= 0 && w.splice(t, 1), l()
	}
	
	function g(e) {
		function i(o) {
			"string" != typeof o && (o = t.stringify(o)), c(e, o, !0)
		}
		console.log("start upload", e), e.statusEl.attr("class", "uploading").text("Uploading...");
		var s = e.file;
		o.loadImageShrinkAndThumbnail(s, i, function (t, o, s) {
			n.createUserImageSpec(t, o, i, function (l) {
				function u() {
					var t = Math.ceil(.9 * f + .1 * h);
					e.progressEl.attr("style", "width: " + t + "%;")
				}
				
				function c() {
					if (p > 0 && g > 0) {
						var t = {
							hasImage: p,
							hasThumbnail: g,
							hasDrawCommands: 0
						};
						n.updateMetaData(l.id, l.secret, t, i, function () {
							d(e, l)
						})
					}
				}
				o = null, 0 > k && (k = l.id + 1), l.id < k && (k = l.id, y.attr("href", S + "?minId=" + k));
				var p = 0,
					g = 0,
					f = 0,
					h = 0;
				r.uploadS3WithRetry(t, l.image, {
					label: "Uploading original image",
					maxAge: 31536e3,
					progress: function (e) {
						f = e, u()
					},
					error: a.register,
					success: function (e) {
						a.deregister(e), t = null, p = 1, c()
					}
				}), r.uploadS3WithRetry(s, l.thumbnail, {
					label: "Uploading thumbnail",
					maxAge: 31536e3,
					progress: function (e) {
						h = e, u()
					},
					error: a.register,
					success: function (e) {
						a.deregister(e), s = null, g = 1, c()
					}
				})
			})
		})
	}
	var f = {},
		h = !1,
		m = 3,
		w = [],
		v = [],
		b = {},
		y = null,
		S = null,
		k = -1;
	return f.handleNewFiles = function (e) {
		console.log("Bulk.handleNewFiles", e), h || (h = !0, t.modal("#bulk-dialog"), $(window).on("beforeunload", i), y = $("#bulk-start-clipping-button"), S = y.attr("href"));
		for (var o = 0, n = 0; n < e.length; n++) {
			var r = e[n],
				a = s(r),
				d = r.name + "_" + r.size;
			window.Globals.SupportedContentTypes.indexOf(r.type) < 0 ? c(a, "Unsupported file type: " + r.type, !1) : b.hasOwnProperty(d) ? u(a) : (b[d] = 1, v.push(a), o++)
		}
		o > 0 && t.gaTrack("bulk", "upload", null, o), l()
	}, f
}), define("bulkclip", ["const", "util", "canvasex", "webapi", "fileuploader", "retrydialog", "history"], function (e, t, o, n, r, a, i) {
	function s(t) {
		function o() {
			a.contentWindow.M.unhookBeforeunload(), a.other.contentWindow.M && a.other.contentWindow.M.unhookBeforeunload(), Globals.Bulk.isApi ? y() : i.exit()
		}
		
		function n() {
			u && c && d ? (console.log("checkStepImageForThisIframe", t, u, c, d), u = c = d = !1, a.readyForNextImage = !0, h(!1)) : a.hasGenerateError && S()
		}
		
		function r() {
			return "/bulk/iframe/" + s.id + "/" + s.secret + (Globals.Bulk.isApi ? "?api=true" : "")
		}
		var a = {};
		a.other = null, a.el = $(t), a.contentWindow = a.el[0].contentWindow;
		var s = {
			id: -1,
			secret: "unknown"
		};
		a.readyForNextImage = !0;
		var u = !1,
			c = !1,
			d = !1;
		return a.hasGenerateError = !1, a.exitOnSave = !1, a.checkHandleEvent = function (r) {
			if (r.source == a.contentWindow) {
				var i = JSON.parse(r.data);
				switch (i.command) {
					case e.DocumentReady:
					case e.Booted:
						l();
						break;
					case e.Skip:
						console.log("Skipping!", t), u = !0, c = !0, a.hasGenerateError = !1, d = i.saved, m(), n();
						break;
					case e.GenerateResult:
						console.log("Done & Next!", t), u = !0, c = !1, a.hasGenerateError = !1, d = i.saved, m();
						break;
					case e.MaybeSaved:
						d = i.saved, n(), d && a.exitOnSave && o();
						break;
					case e.SavedAndResultReady:
						checkPostMessage(i), console.log("SavedAndResultReady!", t, i.success, i.msg), c = i.success, d = i.saved, a.hasGenerateError = !i.success, n();
						break;
					case e.Exiting:
						a.other.contentWindow.M && a.other.contentWindow.M.checkSaveDrawCommands();
						break;
					case e.Exit:
						i.isNice && a.other.contentWindow.M && a.other.contentWindow.M.hasUnsavedChanges() ? a.other.exitOnSave = !0 : o()
				}
				return (i.error || i.command == e.Error) && (checkPostMessage(i), u = c = d = !1, a.readyForNextImage = !0, n()), !0
			}
			return !1
		}, a.setImage = function (e) {
			console.log("setImage", t, e), e && (u = !1, a.readyForNextImage = !1, a.hasGenerateError = !1, s = e, a.contentWindow.location.replace(r()))
		}, a.getId = function () {
			return s.id
		}, a
	}
	
	function l() {
		A || R.el[0].contentWindow.focus()
	}
	
	function u() {
		if (!Globals.Bulk.isApi) {
			for (var e = 0, t = 0; t < M.length; t++) M[t].hasImage && e++;
			console.log("checkUpdateImages", M.length, e), 3 >= e && p()
		}
	}
	
	function c(e) {
		console.log("BulkClip.updateImages 2 ERROR", e), $("#bulk-loading-error-message").text(e), b("error")
	}
	
	function d(e) {
		var t = 0;
		M = M.concat(e.images).sort(function (e, t) {
			return e.id - t.id
		}).filter(function (e) {
			var o = e.id != t;
			return t = e.id, o
		}), console.log("BulkClip.updateImages SUCCESS", e.images, M.map(function (e) {
			return "" + e.id + ": " + e.hasImage
		})), h(!1), b("ready")
	}
	
	function p() {
		Globals.Bulk.isApi || (console.log("updateImages", window.Globals.Bulk.MinId, F, M.length), b("loading"), C.length > 0 && (n.listImagesEx("createdOrUploaded", void 0, void 0, C, c, d), C = []), n.listImagesEx("createdOrUploaded", F + 1, void 0, [], c, d))
	}
	
	function g(e) {
		var t = e.originalEvent;
		(t.origin == Globals.targetOrigin || "*" == Globals.targetOrigin) && (R.checkHandleEvent(t) || x.checkHandleEvent(t))
	}
	
	function f() {
		for (;;) {
			var e = M.shift();
			if (null == e) return null;
			if (!z.hasOwnProperty(e.id)) {
				if (e.hasImage) return e.id > F && (F = e.id), z[e.id] = !0, e;
				C.push(e.id)
			}
		}
	}
	
	function h(e) {
		console.log("ensureIframeSrcsPopulated", e), R.readyForNextImage && R.setImage(f()), x.readyForNextImage && x.setImage(f()), e && u(), S()
	}
	
	function m() {
		console.log("toggleIframe", R.readyForNextImage, x.readyForNextImage);
		var e = x;
		x = R, R = e, w(x.el), u(), S()
	}
	
	function w(e) {
		e.css("z-index", 0)
	}
	
	function v(e) {
		e.css("z-index", 1001)
	}
	
	function b(e) {
		if (A) {
			T.toggleClass("loading", "loading" == e), T.toggleClass("error", "error" == e);
			var t = "ready" == e && !x.readyForNextImage;
			T.toggleClass("generating", t), t ? I.attr("disabled", !0) : I.removeAttr("disabled")
		}
		D = e
	}
	
	function y() {
		P || (checkPostMessage({
			command: e.Exit
		}), P = !0)
	}
	
	function S() {
		return console.log("updateShowState", R.readyForNextImage), R.readyForNextImage && !x.readyForNextImage && x.hasGenerateError ? void m() : (R.readyForNextImage && x.readyForNextImage && y(), void(R.readyForNextImage ? (w(R.el), A = !0, b(D), v(T), T.focus()) : (history.replaceState({}, "", "/bulk/clip?minId=" + R.getId()), v(R.el), A = !1, l(), setTimeout(l, 100), w(T))))
	}
	var k = {},
		M = null,
		C = [],
		R = null,
		x = null,
		T = null,
		A = !0,
		D = null,
		I = null,
		z = {},
		F = 0;
	$(document).ready(function () {
		window.Globals.Bulk.isClip && ($(window).on("message", g), M = Globals.Bulk.ClipImages, R = s("#bulk-iframe-0"), x = s("#bulk-iframe-1"), x.other = R, R.other = x, T = $("#bulk-status"), I = $(".bulk-download-button"), F = window.Globals.Bulk.MinId, h(!1))
	});
	var P = !1;
	return window.bulkUpdateImages = p, k
}), define("bulkdownload", ["const", "util", "canvasex", "webapi", "fileuploader", "retrydialog", "router"], function (e, t, o, n, r, a, i) {
	function s(e, o) {
		function r(e) {
			console.log("BulkDownload.show", e), a.toggle("waiting" == e), c.toggle("ready" == e), d.toggle("error" == e), s.toggle("empty" == e), f.toggle("single" == e)
		}
		if (!window.Globals.Bulk.isAllowed) return void alert("Please subscribe to a Bulk Clipping plan first, thanks!");
		console.log("bulkDownload", e, o), window.Globals.Bulk.MinId = e;
		var a = $(u + "-waiting"),
			s = $(u + "-empty"),
			l = $(u + "-progress"),
			c = $(u + "-ready"),
			d = $(u + "-error"),
			p = $(u + "-error-msg"),
			g = $(u + "-download-link"),
			f = $(u + "-single"),
			h = $(u + "-single-download-link"),
			m = null,
			w = !1,
			v = !1,
			b = !1;
		l.css("width", "0%"), r("waiting"), t.modal(u), n.listImagesEx(o ? "generated" : "generatedButNotDownloaded", e, o, [], function (e) {
			console.log("BD.listImages Error", e), p.text(t.stringify(e)), r("error")
		}, function (e) {
			function o() {
				return n.getNextWorkerUrl() + "/bulk/websocket"
			}
			
			function a() {
				var e = o();
				console.log("BD.createWebSocket", e), m = new WebSocket(e), m.binaryType = "arraybuffer", m.onopen = s, m.onclose = u, m.onmessage = c
			}
			
			function s() {
				console.log("BD.CONNECTED", new Date), m.send(JSON.stringify({
					email: window.Globals.email,
					images: y
				}))
			}
			
			function u(e) {
				if (console.log("BD.DISCONNECTED", new Date), m = null, !b) {
					if (!e.reason) return d(w ? "Download server closed connection prematurely." : "Unable to connect to the worker. Is your firewall or proxy blocking WebSockets?");
					switch (e.reason) {
						case "3":
							return d("Invalid input");
						case "-1":
							return d("Internal server error");
						default:
							return d("Timeout or worker termination")
					}
				}
			}
			
			function c(e) {
				if ("string" == typeof e.data) {
					console.log("BD.onMessage: ", e.data);
					var t = JSON.parse(e.data);
					w = !0, t.error ? d(t.error.message) : f(t)
				}
			}
			
			function d(e) {
				if (!b) {
					console.log("BD.ERROR", e, arguments, m), v = !0;
					var o = "Unknown error";
					o = "string" == typeof e ? e : e instanceof Event ? "Unable to connect to the worker. Is your firewall or proxy blocking WebSockets?" : t.stringify(e), p.text(o), r("error")
				}
			}
			
			function f(e) {
				console.log("BD.newMessageFromServer", JSON.stringify(e)), e.progress ? l.css("width", e.progress + "%") : e.url ? (g.attr("href", e.url), r("ready"), b = !0, t.gaTrack("bulk", "download", null, y.length)) : e.redirectUrl ? (location.href = i.redirectUrl(e.redirectUrl, e.kind, e.message), b = !0) : e.empty && (r("empty"), b = !0)
			}
			console.log("BD.listImages Success", e, e.images);
			var y = e.images;
			if (0 == y.length) r("empty");
			else if (1 == y.length) {
				t.gaTrack("bulk", "download", null, y.length);
				var S = y[0];
				h.attr("href", i.downloadUrl(S.id, S.secret)), r("single")
			} else a()
		})
	}
	var l = {},
		u = "#bulk-download-dialog";
	return $(document).ready(function () {
		$(".bulk-download-button").click(function () {
			s(window.Globals.Bulk.MinId)
		})
	}), window.bulkDownload = s, l
}), define("introanim", [], function () {}), define("scrollcrop", ["util"], function (e) {
	function t() {
		var t = $(document).scrollTop() + .7 * $(window).height();
		n.each(function () {
			var o = $(this),
				n = t - o.offset().top,
				r = o.height(),
				a = e.clamp(n, 0, r),
				i = "rect(0px, " + (o.width() + 1) + "px, " + a + "px, 0px)";
			o.css("clip", i), $(o.data("scroll-crop-companion")).css("top", a + "px").toggle(a > 0 && r > a), $(o.data("scroll-crop-show")).toggle(a == r)
		})
	}
	var o = {},
		n = null;
	return o.checkInit = function () {
		n = $(".scroll-crop"), 0 !== n.length && ($(window).resize(t).scroll(t), t())
	}, o
}), require(["filedropper", "fileuploader", "app", "webapi", "model", "canvasex", "util", "filedownloader", "const", "toolmode", "bulkupload", "bulkclip", "bulkdownload", "viewport", "cropapp", "history", "introanim", "scrollcrop"], function (e, t, o, n, r, a, i, s, l, u, c, d, p, g, f, h, m, w) {
	function v() {
		function e(e, t) {
			e || i.push(t)
		}
		
		function t(t, o) {
			try {
				e(t(), o)
			} catch (n) {
				e(!1, o)
			}
		}
		
		function o() {
			var e = document.createElement("canvas");
			return !(!e.getContext || !e.getContext("2d"))
		}
		
		function n() {
			var e = document.createElement("div");
			return "draggable" in e || "ondragstart" in e && "ondrop" in e
		}
		
		function r() {
			return "undefined" != typeof Uint8Array && "undefined" != typeof new Uint8Array(2).set
		}
		
		function a() {
			return !!new Blob
		}
		var i = [];
		return t(o, "HTML5 Canvas"), e(window.WebSocket, "WebSockets"), t(n, "HTML5 Drag-and-Drop"), e(window.URL, "window.URL Support"), e(window.XMLHttpRequest, "XML Http Requests"), t(r, "Native Type Arrays"), e(window.history && window.history.pushState, "HTML5 History"), e(window.Worker, "Web Workers"), t(a, "Blob and/or Blob Constructor"), e(!navigator.userAgent.match(/(iPad|iPhone|iPod)/g), "iOS is Not Currently Supported"), i.sort(), i
	}
	
	function b() {
		var e = !window.Globals.Bulk.isUpload || window.Globals.Bulk.isAllowed;
		if (null == A) {
			if (A = v(), A.length > 0) {
				for (var t = "<h1>Unsupported Browser</h1><p>Terribly sorry, but your browser appears to be missing key feature(s) required to use this website:</p><ul>", o = 0; o < A.length; o++) t += "<li>" + A[o] + "</li>";
				t += "</ul>", t += '<div>Please try the latest version of one of these browsers instead: <b><a href="http://www.google.com/chrome">Chrome</a>, <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">Internet Explorer 11+</a></b>.</div>', $("#modernizr-alert").html(t).slideDown(500)
			}
			0 == A.length && e || ($("body").addClass("cannot-run-app"), $(".app-starter").attr("disabled", "disabled").addClass("disabled"))
		} else A.length > 0 && ($("html, body").scrollTop(0), i.blink("#modernizr-alert"));
		return 0 == A.length && e && $("#app").length > 0
	}
	
	function y(e, t) {
		if (!r.appHasAlreadyRun)
			if (window.Globals.SupportedContentTypes.indexOf(e.type.toLowerCase()) < 0) i.fatalError("Sorry, only " + window.Globals.SupportedExtensions.join(", ") + ' files are supported - the browser categorized your file as "' + e.type + '".');
			else {
				var o = e.name + ":" + e.size;
				console.log("handleNewFile", o, window.Globals.lastImageUploaded.key), o == window.Globals.lastImageUploaded.key ? (i.gaTrack("image", "duplicate"), location.href = window.Globals.lastImageUploaded.url) : (i.gaTrack("image", "uploaded"), i.spinner(!0), a.loadImageShrinkAndThumbnail(e, i.fatalError, function (e, o, a) {
					n.createUserImageSpec(e, o, i.fatalError, function (n) {
						i.spinner(!1), r.create(e, o, a, n, t)
					})
				}))
			}
	}
	
	function S(e, t) {
		$.ajax(e, {
			cache: !1,
			dataType: "json",
			error: i.fatalError,
			success: t,
			type: "GET"
		})
	}
	
	function k(e, t, o) {
		function n() {
			a && l && (i.progress(!1), y(a, l))
		}
		if (!r.appHasAlreadyRun && b()) {
			i.gaTrack("image", "fromUrl", e), i.progress(!0);
			var a = null,
				l = null;
			o ? S(o, function (e) {
				l = e || {}, n()
			}) : l = {
				newImage: !0
			}, s.download({
				url: e,
				progress: i.progressUpdate,
				error: i.fatalError,
				success: function (e) {
					a = e, a.name = t || "FetchedFromUrl_" + Math.round(1e6 * Math.random()), n()
				}
			})
		}
	}
	
	function M(e, t) {
		!r.appHasAlreadyRun && b() && (i.gaTrack("image", "resumed"), i.progress(!0), n.readUserImageSpec(e, t, i.fatalError, function (e) {
			function t() {
				o && n && (i.progress(!1), r.resume(o, e, n))
			}
			var o = null,
				n = null;
			e.hasDrawCommands > 0 ? S(e.drawCommands.url, function (e) {
				n = e || {}, t()
			}) : n = {}, s.download({
				url: e.image.url,
				progress: i.progressUpdate,
				error: i.fatalError,
				success: function (e) {
					i.loadImageFromBlob(e, i.fatalError, function (e) {
						o = a.shrinkImage(e, l.MaxNumPixels), t()
					})
				}
			})
		}))
	}
	
	function C(e) {
		window != window.top && window.parent && (console.log("checkPostMessage", e), window.parent.postMessage(JSON.stringify(e), window.Globals.targetOrigin))
	}
	
	function R() {
		var e = document;
		if (!window.filepicker) {
			var t = e.createElement("script");
			t.type = "text/javascript", t.async = !0, t.src = ("https:" === e.location.protocol ? "https:" : "http:") + "//api.filepicker.io/v1/filepicker.js";
			var o = e.getElementsByTagName("script")[0];
			o.parentNode.insertBefore(t, o);
			var n = {};
			n._queue = [];
			for (var r = "pick,pickMultiple,pickAndStore,read,write,writeUrl,export,convert,store,storeUrl,remove,stat,setKey,constructWidget,makeDropPane".split(","), a = function (e, t) {
				return function () {
					t.push([e, arguments])
				}
			}, i = 0; i < r.length; i++) n[r[i]] = a(r[i], n._queue);
			window.filepicker = n
		}
	}
	
	function x() {
		R(), filepicker.setKey("AkwlnmfpSxG4WcIeLMnH3z"), filepicker.pick({
			mimetypes: ["image/*"],
			container: "modal",
			services: ["URL", "BOX", "DROPBOX", "EVERNOTE", "FACEBOOK", "FLICKR", "FTP", "GOOGLE_DRIVE", "SKYDRIVE", "PICASA", "GMAIL", "IMAGE_SEARCH", "INSTAGRAM"],
			openTo: "URL"
		}, function (e) {
			k(e.url, e.filename)
		})
	}
	window.URL = window.URL || window.webkitURL, window.WebSocket = window.WebSocket || window.MozWebSocket;
	try {
		window.myLocalStorage = window.localStorage || {}
	} catch (T) {
		window.myLocalStorage = {}
	}
	r.App = o, r.CropApp = f, r.appHasAlreadyRun = !1, g.setM(r);
	var A = null;
	$(document).ready(function () {
		var t = b();
		C(window.Globals.err ? window.Globals.err : {
			command: l.DocumentReady,
			canRun: t
		}), t && (u.initialize(), e.initialize({
			monitor_file_input: $('input[type="file"].FileDropper'),
			error: function (e) {
				alert(e)
			},
			drop: function (e) {
				window.Globals.Bulk.isUpload ? c.handleNewFiles(e) : y(e[0], {
					newImage: !0
				})
			},
			dropOnce: !window.Globals.Bulk.isUpload
		}), h.initialize(r), "undefined" != typeof ResumeImage && M(ResumeImage.id, ResumeImage.secret)), w.checkInit()
	}), window.loadWithFilePicker = x, window.checkPostMessage = C, window.resumeUserImage = M, window.newImageFromUrl = k
}), define("main", function () {});
//# sourceMappingURL=main.js.map