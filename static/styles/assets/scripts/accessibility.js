﻿/*
 Highcharts JS v9.0.1 (2021-02-15)

 Accessibility module

 (c) 2010-2021 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function (b) { "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/accessibility", ["highcharts"], function (w) { b(w); b.Highcharts = w; return b }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (b) {
    function w(b, k, n, p) { b.hasOwnProperty(k) || (b[k] = p.apply(null, n)) } b = b ? b._modules : {}; w(b, "Accessibility/Utils/HTMLUtilities.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, k) {
        var x = b.doc, p = b.win, t =
            k.merge; return {
                addClass: function (b, h) { b.classList ? b.classList.add(h) : 0 > b.className.indexOf(h) && (b.className += h) }, escapeStringForHTML: function (b) { return b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") }, getElement: function (b) { return x.getElementById(b) }, getFakeMouseEvent: function (b) {
                    if ("function" === typeof p.MouseEvent) return new p.MouseEvent(b); if (x.createEvent) {
                        var g = x.createEvent("MouseEvent"); if (g.initMouseEvent) return g.initMouseEvent(b,
                            !0, !0, p, "click" === b ? 1 : 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), g
                    } return { type: b }
                }, getHeadingTagNameForElement: function (b) { var g = function (b) { b = parseInt(b.slice(1), 10); return "h" + Math.min(6, b + 1) }, u = function (b) { var f; a: { for (f = b; f = f.previousSibling;) { var e = f.tagName || ""; if (/H[1-6]/.test(e)) { f = e; break a } } f = "" } if (f) return g(f); b = b.parentElement; if (!b) return "p"; f = b.tagName; return /H[1-6]/.test(f) ? g(f) : u(b) }; return u(b) }, removeElement: function (b) { b && b.parentNode && b.parentNode.removeChild(b) }, reverseChildNodes: function (b) {
                    for (var g =
                        b.childNodes.length; g--;)b.appendChild(b.childNodes[g])
                }, setElAttrs: function (b, h) { Object.keys(h).forEach(function (g) { var r = h[g]; null === r ? b.removeAttribute(g) : b.setAttribute(g, r) }) }, stripHTMLTagsFromString: function (b) { return "string" === typeof b ? b.replace(/<\/?[^>]+(>|$)/g, "") : b }, visuallyHideElement: function (b) {
                    t(!0, b.style, {
                        position: "absolute", width: "1px", height: "1px", overflow: "hidden", whiteSpace: "nowrap", clip: "rect(1px, 1px, 1px, 1px)", marginTop: "-3px", "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)",
                        filter: "alpha(opacity=1)", opacity: "0.01"
                    })
                }
            }
    }); w(b, "Accessibility/Utils/ChartUtilities.js", [b["Accessibility/Utils/HTMLUtilities.js"], b["Core/Utilities.js"]], function (b, k) {
        function x(a) {
            var c = a.chart, d = {}, l = "Seconds"; d.Seconds = ((a.max || 0) - (a.min || 0)) / 1E3; d.Minutes = d.Seconds / 60; d.Hours = d.Minutes / 60; d.Days = d.Hours / 24;["Minutes", "Hours", "Days"].forEach(function (a) { 2 < d[a] && (l = a) }); var e = d[l].toFixed("Seconds" !== l && "Minutes" !== l ? 1 : 0); return c.langFormat("accessibility.axis.timeRange" + l, {
                chart: c, axis: a,
                range: e.replace(".0", "")
            })
        } function p(a) { var c, d, l = a.chart, e = (null === (d = null === (c = l.options) || void 0 === c ? void 0 : c.accessibility) || void 0 === d ? void 0 : d.screenReaderSection.axisRangeDateFormat) || ""; c = function (d) { return a.dateTime ? l.time.dateFormat(e, a[d]) : a[d] }; return l.langFormat("accessibility.axis.rangeFromTo", { chart: l, axis: a, rangeFrom: c("min"), rangeTo: c("max") }) } function t(a) {
            var c, d; if (null === (c = a.points) || void 0 === c ? 0 : c.length) return a = f(a.points, function (a) { return !!a.graphic }), null === (d = null ===
                a || void 0 === a ? void 0 : a.graphic) || void 0 === d ? void 0 : d.element
        } function g(a) { var c = t(a); return c && c.parentNode || a.graph && a.graph.element || a.group && a.group.element } function h(a, c) { c.setAttribute("aria-hidden", !1); c !== a.renderTo && c.parentNode && (Array.prototype.forEach.call(c.parentNode.childNodes, function (a) { a.hasAttribute("aria-hidden") || a.setAttribute("aria-hidden", !0) }), h(a, c.parentNode)) } var u = b.stripHTMLTagsFromString, r = k.defined, f = k.find, e = k.fireEvent; return {
            getChartTitle: function (a) {
                return u(a.options.title.text ||
                    a.langFormat("accessibility.defaultChartTitle", { chart: a }))
            }, getAxisDescription: function (a) { return a && (a.userOptions && a.userOptions.accessibility && a.userOptions.accessibility.description || a.axisTitle && a.axisTitle.textStr || a.options.id || a.categories && "categories" || a.dateTime && "Time" || "values") }, getAxisRangeDescription: function (a) {
                var c = a.options || {}; return c.accessibility && "undefined" !== typeof c.accessibility.rangeDescription ? c.accessibility.rangeDescription : a.categories ? (c = a.chart, a = a.dataMax && a.dataMin ?
                    c.langFormat("accessibility.axis.rangeCategories", { chart: c, axis: a, numCategories: a.dataMax - a.dataMin + 1 }) : "", a) : !a.dateTime || 0 !== a.min && 0 !== a.dataMin ? p(a) : x(a)
            }, getPointFromXY: function (a, c, d) { for (var l = a.length, e; l--;)if (e = f(a[l].points || [], function (a) { return a.x === c && a.y === d })) return e }, getSeriesFirstPointElement: t, getSeriesFromName: function (a, c) { return c ? (a.series || []).filter(function (a) { return a.name === c }) : a.series }, getSeriesA11yElement: g, unhideChartElementFromAT: h, hideSeriesFromAT: function (a) {
                (a =
                    g(a)) && a.setAttribute("aria-hidden", !0)
            }, scrollToPoint: function (a) { var c = a.series.xAxis, d = a.series.yAxis, l = (null === c || void 0 === c ? 0 : c.scrollbar) ? c : d; if ((c = null === l || void 0 === l ? void 0 : l.scrollbar) && r(c.to) && r(c.from)) { d = c.to - c.from; if (r(l.dataMin) && r(l.dataMax)) { var b = l.toPixels(l.dataMin), f = l.toPixels(l.dataMax); a = (l.toPixels(a["xAxis" === l.coll ? "x" : "y"] || 0) - b) / (f - b) } else a = 0; c.updatePosition(a - d / 2, a + d / 2); e(c, "changed", { from: c.from, to: c.to, trigger: "scrollbar", DOMEvent: null }) } }
        }
    }); w(b, "Accessibility/KeyboardNavigationHandler.js",
        [b["Core/Utilities.js"]], function (b) { function k(b, k) { this.chart = b; this.keyCodeMap = k.keyCodeMap || []; this.validate = k.validate; this.init = k.init; this.terminate = k.terminate; this.response = { success: 1, prev: 2, next: 3, noHandler: 4, fail: 5 } } var x = b.find; k.prototype = { run: function (b) { var k = b.which || b.keyCode, g = this.response.noHandler, h = x(this.keyCodeMap, function (b) { return -1 < b[0].indexOf(k) }); h ? g = h[1].call(this, k, b) : 9 === k && (g = this.response[b.shiftKey ? "prev" : "next"]); return g } }; return k }); w(b, "Accessibility/Utils/DOMElementProvider.js",
            [b["Core/Globals.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Core/Utilities.js"]], function (b, k, n) { var x = b.doc, t = k.removeElement; b = n.extend; k = function () { this.elements = [] }; b(k.prototype, { createElement: function () { var b = x.createElement.apply(x, arguments); this.elements.push(b); return b }, destroyCreatedElements: function () { this.elements.forEach(function (b) { t(b) }); this.elements = [] } }); return k }); w(b, "Accessibility/Utils/EventProvider.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, k) {
                var x =
                    k.addEvent; k = k.extend; var p = function () { this.eventRemovers = [] }; k(p.prototype, { addEvent: function () { var k = x.apply(b, arguments); this.eventRemovers.push(k); return k }, removeAddedEvents: function () { this.eventRemovers.forEach(function (b) { b() }); this.eventRemovers = [] } }); return p
            }); w(b, "Accessibility/AccessibilityComponent.js", [b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/DOMElementProvider.js"], b["Accessibility/Utils/EventProvider.js"], b["Core/Globals.js"], b["Accessibility/Utils/HTMLUtilities.js"],
            b["Core/Utilities.js"]], function (b, k, n, p, t, g) {
                function h() { } var u = b.unhideChartElementFromAT, r = p.doc, f = p.win, e = t.removeElement, a = t.getFakeMouseEvent; b = g.extend; var c = g.fireEvent, d = g.merge; h.prototype = {
                    initBase: function (a) { this.chart = a; this.eventProvider = new n; this.domElementProvider = new k; this.keyCodes = { left: 37, right: 39, up: 38, down: 40, enter: 13, space: 32, esc: 27, tab: 9 } }, addEvent: function () { return this.eventProvider.addEvent.apply(this.eventProvider, arguments) }, createElement: function () {
                        return this.domElementProvider.createElement.apply(this.domElementProvider,
                            arguments)
                    }, fireEventOnWrappedOrUnwrappedElement: function (a, d) { var l = d.type; r.createEvent && (a.dispatchEvent || a.fireEvent) ? a.dispatchEvent ? a.dispatchEvent(d) : a.fireEvent(l, d) : c(a, l, d) }, fakeClickEvent: function (d) { if (d) { var c = a("click"); this.fireEventOnWrappedOrUnwrappedElement(d, c) } }, addProxyGroup: function (a) { this.createOrUpdateProxyContainer(); var d = this.createElement("div"); Object.keys(a || {}).forEach(function (c) { null !== a[c] && d.setAttribute(c, a[c]) }); this.chart.a11yProxyContainer.appendChild(d); return d },
                    createOrUpdateProxyContainer: function () { var a = this.chart, d = a.renderer.box; a.a11yProxyContainer = a.a11yProxyContainer || this.createProxyContainerElement(); d.nextSibling !== a.a11yProxyContainer && a.container.insertBefore(a.a11yProxyContainer, d.nextSibling) }, createProxyContainerElement: function () { var a = r.createElement("div"); a.className = "highcharts-a11y-proxy-container"; return a }, createProxyButton: function (a, c, e, b, f) {
                        var l = a.element, y = this.createElement("button"), g = d({ "aria-label": l.getAttribute("aria-label") },
                            e); Object.keys(g).forEach(function (a) { null !== g[a] && y.setAttribute(a, g[a]) }); y.className = "highcharts-a11y-proxy-button"; f && this.addEvent(y, "click", f); this.setProxyButtonStyle(y); this.updateProxyButtonPosition(y, b || a); this.proxyMouseEventsForButton(l, y); c.appendChild(y); g["aria-hidden"] || u(this.chart, y); return y
                    }, getElementPosition: function (a) {
                        var d = a.element; return (a = this.chart.renderTo) && d && d.getBoundingClientRect ? (d = d.getBoundingClientRect(), a = a.getBoundingClientRect(), {
                            x: d.left - a.left, y: d.top - a.top,
                            width: d.right - d.left, height: d.bottom - d.top
                        }) : { x: 0, y: 0, width: 1, height: 1 }
                    }, setProxyButtonStyle: function (a) { d(!0, a.style, { "border-width": 0, "background-color": "transparent", cursor: "pointer", outline: "none", opacity: .001, filter: "alpha(opacity=1)", "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)", zIndex: 999, overflow: "hidden", padding: 0, margin: 0, display: "block", position: "absolute" }) }, updateProxyButtonPosition: function (a, c) {
                        c = this.getElementPosition(c); d(!0, a.style, {
                            width: (c.width || 1) + "px", height: (c.height ||
                                1) + "px", left: (c.x || 0) + "px", top: (c.y || 0) + "px"
                        })
                    }, proxyMouseEventsForButton: function (a, d) { var c = this; "click touchstart touchend touchcancel touchmove mouseover mouseenter mouseleave mouseout".split(" ").forEach(function (l) { var e = 0 === l.indexOf("touch"); c.addEvent(d, l, function (d) { var l = e ? c.cloneTouchEvent(d) : c.cloneMouseEvent(d); a && c.fireEventOnWrappedOrUnwrappedElement(a, l); d.stopPropagation(); d.preventDefault() }, { passive: !1 }) }) }, cloneMouseEvent: function (d) {
                        if ("function" === typeof f.MouseEvent) return new f.MouseEvent(d.type,
                            d); if (r.createEvent) { var c = r.createEvent("MouseEvent"); if (c.initMouseEvent) return c.initMouseEvent(d.type, d.bubbles, d.cancelable, d.view || f, d.detail, d.screenX, d.screenY, d.clientX, d.clientY, d.ctrlKey, d.altKey, d.shiftKey, d.metaKey, d.button, d.relatedTarget), c } return a(d.type)
                    }, cloneTouchEvent: function (a) {
                        var d = function (a) { for (var d = [], c = 0; c < a.length; ++c) { var e = a.item(c); e && d.push(e) } return d }; if ("function" === typeof f.TouchEvent) return d = new f.TouchEvent(a.type, {
                            touches: d(a.touches), targetTouches: d(a.targetTouches),
                            changedTouches: d(a.changedTouches), ctrlKey: a.ctrlKey, shiftKey: a.shiftKey, altKey: a.altKey, metaKey: a.metaKey, bubbles: a.bubbles, cancelable: a.cancelable, composed: a.composed, detail: a.detail, view: a.view
                        }), a.defaultPrevented && d.preventDefault(), d; d = this.cloneMouseEvent(a); d.touches = a.touches; d.changedTouches = a.changedTouches; d.targetTouches = a.targetTouches; return d
                    }, destroyBase: function () { e(this.chart.a11yProxyContainer); this.domElementProvider.destroyCreatedElements(); this.eventProvider.removeAddedEvents() }
                };
                b(h.prototype, { init: function () { }, getKeyboardNavigation: function () { }, onChartUpdate: function () { }, onChartRender: function () { }, destroy: function () { } }); return h
            }); w(b, "Accessibility/KeyboardNavigation.js", [b["Core/Globals.js"], b["Core/Utilities.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Accessibility/Utils/EventProvider.js"]], function (b, k, n, p) {
                function x(e, a) { this.init(e, a) } var g = b.doc, h = b.win, u = k.addEvent, r = k.fireEvent, f = n.getElement; u(g, "keydown", function (e) {
                    27 === (e.which || e.keyCode) && b.charts &&
                    b.charts.forEach(function (a) { a && a.dismissPopupContent && a.dismissPopupContent() })
                }); b.Chart.prototype.dismissPopupContent = function () { var e = this; r(this, "dismissPopupContent", {}, function () { e.tooltip && e.tooltip.hide(0); e.hideExportMenu() }) }; x.prototype = {
                    init: function (e, a) {
                        var c = this, d = this.eventProvider = new p; this.chart = e; this.components = a; this.modules = []; this.currentModuleIx = 0; this.update(); d.addEvent(this.tabindexContainer, "keydown", function (a) { return c.onKeydown(a) }); d.addEvent(this.tabindexContainer,
                            "focus", function (a) { return c.onFocus(a) });["mouseup", "touchend"].forEach(function (a) { return d.addEvent(g, a, function () { return c.onMouseUp() }) });["mousedown", "touchstart"].forEach(function (a) { return d.addEvent(e.renderTo, a, function () { c.isClickingChart = !0 }) }); d.addEvent(e.renderTo, "mouseover", function () { c.pointerIsOverChart = !0 }); d.addEvent(e.renderTo, "mouseout", function () { c.pointerIsOverChart = !1 }); this.modules.length && this.modules[0].init(1)
                    }, update: function (e) {
                        var a = this.chart.options.accessibility;
                        a = a && a.keyboardNavigation; var c = this.components; this.updateContainerTabindex(); a && a.enabled && e && e.length ? (this.modules = e.reduce(function (a, e) { e = c[e].getKeyboardNavigation(); return a.concat(e) }, []), this.updateExitAnchor()) : (this.modules = [], this.currentModuleIx = 0, this.removeExitAnchor())
                    }, onFocus: function (e) { var a, c = this.chart; e = e.relatedTarget && c.container.contains(e.relatedTarget); this.isClickingChart || e || (null === (a = this.modules[0]) || void 0 === a ? void 0 : a.init(1)) }, onMouseUp: function () {
                        delete this.isClickingChart;
                        if (!this.keyboardReset && !this.pointerIsOverChart) { var e = this.chart, a = this.modules && this.modules[this.currentModuleIx || 0]; a && a.terminate && a.terminate(); e.focusElement && e.focusElement.removeFocusBorder(); this.currentModuleIx = 0; this.keyboardReset = !0 }
                    }, onKeydown: function (e) {
                        e = e || h.event; var a, c = this.modules && this.modules.length && this.modules[this.currentModuleIx]; this.keyboardReset = !1; if (c) {
                            var d = c.run(e); d === c.response.success ? a = !0 : d === c.response.prev ? a = this.prev() : d === c.response.next && (a = this.next());
                            a && (e.preventDefault(), e.stopPropagation())
                        }
                    }, prev: function () { return this.move(-1) }, next: function () { return this.move(1) }, move: function (e) {
                        var a = this.modules && this.modules[this.currentModuleIx]; a && a.terminate && a.terminate(e); this.chart.focusElement && this.chart.focusElement.removeFocusBorder(); this.currentModuleIx += e; if (a = this.modules && this.modules[this.currentModuleIx]) { if (a.validate && !a.validate()) return this.move(e); if (a.init) return a.init(e), !0 } this.currentModuleIx = 0; 0 < e ? (this.exiting = !0, this.exitAnchor.focus()) :
                            this.tabindexContainer.focus(); return !1
                    }, updateExitAnchor: function () { var e = f("highcharts-end-of-chart-marker-" + this.chart.index); this.removeExitAnchor(); e ? (this.makeElementAnExitAnchor(e), this.exitAnchor = e) : this.createExitAnchor() }, updateContainerTabindex: function () {
                        var e = this.chart.options.accessibility; e = e && e.keyboardNavigation; e = !(e && !1 === e.enabled); var a = this.chart, c = a.container; a.renderTo.hasAttribute("tabindex") && (c.removeAttribute("tabindex"), c = a.renderTo); this.tabindexContainer = c; var d = c.getAttribute("tabindex");
                        e && !d ? c.setAttribute("tabindex", "0") : e || a.container.removeAttribute("tabindex")
                    }, makeElementAnExitAnchor: function (e) { var a = this.tabindexContainer.getAttribute("tabindex") || 0; e.setAttribute("class", "highcharts-exit-anchor"); e.setAttribute("tabindex", a); e.setAttribute("aria-hidden", !1); this.addExitAnchorEventsToEl(e) }, createExitAnchor: function () { var e = this.chart, a = this.exitAnchor = g.createElement("div"); e.renderTo.appendChild(a); this.makeElementAnExitAnchor(a) }, removeExitAnchor: function () {
                        this.exitAnchor &&
                        this.exitAnchor.parentNode && (this.exitAnchor.parentNode.removeChild(this.exitAnchor), delete this.exitAnchor)
                    }, addExitAnchorEventsToEl: function (e) { var a = this.chart, c = this; this.eventProvider.addEvent(e, "focus", function (d) { d = d || h.event; d.relatedTarget && a.container.contains(d.relatedTarget) || c.exiting ? c.exiting = !1 : (c.tabindexContainer.focus(), d.preventDefault(), c.modules && c.modules.length && (c.currentModuleIx = c.modules.length - 1, (d = c.modules[c.currentModuleIx]) && d.validate && !d.validate() ? c.prev() : d && d.init(-1))) }) },
                    destroy: function () { this.removeExitAnchor(); this.eventProvider.removeAddedEvents(); this.chart.container.removeAttribute("tabindex") }
                }; return x
            }); w(b, "Accessibility/Components/LegendComponent.js", [b["Core/Globals.js"], b["Core/Legend.js"], b["Core/Utilities.js"], b["Accessibility/AccessibilityComponent.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Accessibility/Utils/HTMLUtilities.js"]], function (b, k, n, p, t, g) {
                function h(a) {
                    var d = a.legend && a.legend.allItems, c = a.options.legend.accessibility || {};
                    return !(!d || !d.length || a.colorAxis && a.colorAxis.length || !1 === c.enabled)
                } var u = n.addEvent, r = n.extend, f = n.find, e = n.fireEvent, a = g.removeElement, c = g.stripHTMLTagsFromString; b.Chart.prototype.highlightLegendItem = function (a) {
                    var d = this.legend.allItems, c = this.highlightedLegendItemIx; if (d[a]) {
                        d[c] && e(d[c].legendGroup.element, "mouseout"); c = this.legend; var b = c.allItems[a].pageIx, f = c.currentPage; "undefined" !== typeof b && b + 1 !== f && c.scroll(1 + b - f); this.setFocusToElement(d[a].legendItem, d[a].a11yProxyElement); e(d[a].legendGroup.element,
                            "mouseover"); return !0
                    } return !1
                }; u(k, "afterColorizeItem", function (a) { var d = a.item; this.chart.options.accessibility.enabled && d && d.a11yProxyElement && d.a11yProxyElement.setAttribute("aria-pressed", a.visible ? "true" : "false") }); b = function () { }; b.prototype = new p; r(b.prototype, {
                    init: function () {
                        var a = this; this.proxyElementsList = []; this.recreateProxies(); this.addEvent(k, "afterScroll", function () { this.chart === a.chart && (a.updateProxiesPositions(), a.updateLegendItemProxyVisibility(), this.chart.highlightLegendItem(a.highlightedLegendItemIx)) });
                        this.addEvent(k, "afterPositionItem", function (d) { this.chart === a.chart && this.chart.renderer && a.updateProxyPositionForItem(d.item) })
                    }, updateLegendItemProxyVisibility: function () { var a = this.chart.legend, c = a.currentPage || 1, e = a.clipHeight || 0; (a.allItems || []).forEach(function (d) { var b = d.pageIx || 0, l = d._legendItemPos ? d._legendItemPos[1] : 0, f = d.legendItem ? Math.round(d.legendItem.getBBox().height) : 0; b = l + f - a.pages[b] > e || b !== c - 1; d.a11yProxyElement && (d.a11yProxyElement.style.visibility = b ? "hidden" : "visible") }) }, onChartRender: function () {
                        h(this.chart) ?
                        this.updateProxiesPositions() : this.removeProxies()
                    }, onChartUpdate: function () { this.updateLegendTitle() }, updateProxiesPositions: function () { for (var a = 0, c = this.proxyElementsList; a < c.length; a++) { var b = c[a]; this.updateProxyButtonPosition(b.element, b.posElement) } }, updateProxyPositionForItem: function (a) { var d = f(this.proxyElementsList, function (d) { return d.item === a }); d && this.updateProxyButtonPosition(d.element, d.posElement) }, recreateProxies: function () {
                        this.removeProxies(); h(this.chart) && (this.addLegendProxyGroup(),
                            this.proxyLegendItems(), this.updateLegendItemProxyVisibility())
                    }, removeProxies: function () { a(this.legendProxyGroup); this.proxyElementsList = [] }, updateLegendTitle: function () { var a, b, e = this.chart, f = c(((null === (b = null === (a = e.legend) || void 0 === a ? void 0 : a.options.title) || void 0 === b ? void 0 : b.text) || "").replace(/<br ?\/?>/g, " ")); a = e.langFormat("accessibility.legend.legendLabel" + (f ? "" : "NoTitle"), { chart: e, legendTitle: f }); this.legendProxyGroup && this.legendProxyGroup.setAttribute("aria-label", a) }, addLegendProxyGroup: function () {
                        this.legendProxyGroup =
                        this.addProxyGroup({ "aria-label": "_placeholder_", role: "all" === this.chart.options.accessibility.landmarkVerbosity ? "region" : null })
                    }, proxyLegendItems: function () { var a = this; (this.chart.legend && this.chart.legend.allItems || []).forEach(function (d) { d.legendItem && d.legendItem.element && a.proxyLegendItem(d) }) }, proxyLegendItem: function (a) {
                        if (a.legendItem && a.legendGroup) {
                            var d = this.chart.langFormat("accessibility.legend.legendItem", { chart: this.chart, itemName: c(a.name) }), b = a.legendGroup.div ? a.legendItem : a.legendGroup;
                            a.a11yProxyElement = this.createProxyButton(a.legendItem, this.legendProxyGroup, { tabindex: -1, "aria-pressed": a.visible, "aria-label": d }, b); this.proxyElementsList.push({ item: a, element: a.a11yProxyElement, posElement: b })
                        }
                    }, getKeyboardNavigation: function () {
                        var a = this.keyCodes, c = this; return new t(this.chart, {
                            keyCodeMap: [[[a.left, a.right, a.up, a.down], function (a) { return c.onKbdArrowKey(this, a) }], [[a.enter, a.space], function () { return c.onKbdClick(this) }]], validate: function () { return c.shouldHaveLegendNavigation() },
                            init: function (a) { return c.onKbdNavigationInit(a) }
                        })
                    }, onKbdArrowKey: function (a, c) { var d = this.keyCodes, b = a.response, e = this.chart, l = e.options.accessibility, f = e.legend.allItems.length; c = c === d.left || c === d.up ? -1 : 1; return e.highlightLegendItem(this.highlightedLegendItemIx + c) ? (this.highlightedLegendItemIx += c, b.success) : 1 < f && l.keyboardNavigation.wrapAround ? (a.init(c), b.success) : b[0 < c ? "next" : "prev"] }, onKbdClick: function (a) {
                        var c = this.chart.legend.allItems[this.highlightedLegendItemIx]; c && c.a11yProxyElement &&
                            e(c.a11yProxyElement, "click"); return a.response.success
                    }, shouldHaveLegendNavigation: function () { var a = this.chart, c = a.colorAxis && a.colorAxis.length, b = (a.options.legend || {}).accessibility || {}; return !!(a.legend && a.legend.allItems && a.legend.display && !c && b.enabled && b.keyboardNavigation && b.keyboardNavigation.enabled) }, onKbdNavigationInit: function (a) { var c = this.chart, d = c.legend.allItems.length - 1; a = 0 < a ? 0 : d; c.highlightLegendItem(a); this.highlightedLegendItemIx = a }
                }); return b
            }); w(b, "Accessibility/Components/MenuComponent.js",
                [b["Core/Globals.js"], b["Core/Utilities.js"], b["Accessibility/AccessibilityComponent.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/HTMLUtilities.js"]], function (b, k, n, p, t, g) {
                    function h(b) { return b.exportSVGElements && b.exportSVGElements[0] } k = k.extend; var u = t.unhideChartElementFromAT, r = g.removeElement, f = g.getFakeMouseEvent; b.Chart.prototype.showExportMenu = function () { var b = h(this); if (b && (b = b.element, b.onclick)) b.onclick(f("click")) };
                    b.Chart.prototype.hideExportMenu = function () { var b = this.exportDivElements; b && this.exportContextMenu && (b.forEach(function (a) { if ("highcharts-menu-item" === a.className && a.onmouseout) a.onmouseout(f("mouseout")) }), this.highlightedExportItemIx = 0, this.exportContextMenu.hideMenu(), this.container.focus()) }; b.Chart.prototype.highlightExportItem = function (b) {
                        var a = this.exportDivElements && this.exportDivElements[b], c = this.exportDivElements && this.exportDivElements[this.highlightedExportItemIx]; if (a && "LI" === a.tagName &&
                            (!a.children || !a.children.length)) { var d = !!(this.renderTo.getElementsByTagName("g")[0] || {}).focus; a.focus && d && a.focus(); if (c && c.onmouseout) c.onmouseout(f("mouseout")); if (a.onmouseover) a.onmouseover(f("mouseover")); this.highlightedExportItemIx = b; return !0 } return !1
                    }; b.Chart.prototype.highlightLastExportItem = function () { var b; if (this.exportDivElements) for (b = this.exportDivElements.length; b--;)if (this.highlightExportItem(b)) return !0; return !1 }; b = function () { }; b.prototype = new n; k(b.prototype, {
                        init: function () {
                            var b =
                                this.chart, a = this; this.addEvent(b, "exportMenuShown", function () { a.onMenuShown() }); this.addEvent(b, "exportMenuHidden", function () { a.onMenuHidden() })
                        }, onMenuHidden: function () { var b = this.chart.exportContextMenu; b && b.setAttribute("aria-hidden", "true"); this.isExportMenuShown = !1; this.setExportButtonExpandedState("false") }, onMenuShown: function () { var b = this.chart, a = b.exportContextMenu; a && (this.addAccessibleContextMenuAttribs(), u(b, a)); this.isExportMenuShown = !0; this.setExportButtonExpandedState("true") }, setExportButtonExpandedState: function (b) {
                            var a =
                                this.exportButtonProxy; a && a.setAttribute("aria-expanded", b)
                        }, onChartRender: function () {
                            var b = this.chart, a = b.options.accessibility; r(this.exportProxyGroup); var c = b.options.exporting, d = h(b); c && !1 !== c.enabled && c.accessibility && c.accessibility.enabled && d && d.element && (this.exportProxyGroup = this.addProxyGroup("all" === a.landmarkVerbosity ? { "aria-label": b.langFormat("accessibility.exporting.exportRegionLabel", { chart: b }), role: "region" } : {}), a = h(this.chart), this.exportButtonProxy = this.createProxyButton(a, this.exportProxyGroup,
                                { "aria-label": b.langFormat("accessibility.exporting.menuButtonLabel", { chart: b }), "aria-expanded": "false" }))
                        }, addAccessibleContextMenuAttribs: function () { var b = this.chart, a = b.exportDivElements; a && a.length && (a.forEach(function (a) { "LI" !== a.tagName || a.children && a.children.length ? a.setAttribute("aria-hidden", "true") : a.setAttribute("tabindex", -1) }), a = a[0].parentNode, a.removeAttribute("aria-hidden"), a.setAttribute("aria-label", b.langFormat("accessibility.exporting.chartMenuLabel", { chart: b }))) }, getKeyboardNavigation: function () {
                            var b =
                                this.keyCodes, a = this.chart, c = this; return new p(a, { keyCodeMap: [[[b.left, b.up], function () { return c.onKbdPrevious(this) }], [[b.right, b.down], function () { return c.onKbdNext(this) }], [[b.enter, b.space], function () { return c.onKbdClick(this) }]], validate: function () { return a.exportChart && !1 !== a.options.exporting.enabled && !1 !== a.options.exporting.accessibility.enabled }, init: function () { var b = c.exportButtonProxy, e = a.exportingGroup; e && b && a.setFocusToElement(e, b) }, terminate: function () { a.hideExportMenu() } })
                        }, onKbdPrevious: function (b) {
                            var a =
                                this.chart, c = a.options.accessibility; b = b.response; for (var d = a.highlightedExportItemIx || 0; d--;)if (a.highlightExportItem(d)) return b.success; return c.keyboardNavigation.wrapAround ? (a.highlightLastExportItem(), b.success) : b.prev
                        }, onKbdNext: function (b) {
                            var a = this.chart, c = a.options.accessibility; b = b.response; for (var d = (a.highlightedExportItemIx || 0) + 1; d < a.exportDivElements.length; ++d)if (a.highlightExportItem(d)) return b.success; return c.keyboardNavigation.wrapAround ? (a.highlightExportItem(0), b.success) :
                                b.next
                        }, onKbdClick: function (b) { var a = this.chart, c = a.exportDivElements[a.highlightedExportItemIx], d = h(a).element; this.isExportMenuShown ? this.fakeClickEvent(c) : (this.fakeClickEvent(d), a.highlightExportItem(0)); return b.response.success }
                    }); return b
                }); w(b, "Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js", [b["Core/Chart/Chart.js"], b["Core/Series/Point.js"], b["Core/Series/Series.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"], b["Accessibility/KeyboardNavigationHandler.js"],
                b["Accessibility/Utils/EventProvider.js"], b["Accessibility/Utils/ChartUtilities.js"]], function (b, k, n, p, t, g, h, u) {
                    function r(a) { var b = a.index, c = a.series.points, d = c.length; if (c[b] !== a) for (; d--;) { if (c[d] === a) return d } else return b } function f(a) {
                        var b = a.chart.options.accessibility.keyboardNavigation.seriesNavigation, c = a.options.accessibility || {}, d = c.keyboardNavigation; return d && !1 === d.enabled || !1 === c.enabled || !1 === a.options.enableMouseTracking || !a.visible || b.pointNavigationEnabledThreshold && b.pointNavigationEnabledThreshold <=
                            a.points.length
                    } function e(a) { var b, c = a.series.chart.options.accessibility, d = !1 === (null === (b = a.options.accessibility) || void 0 === b ? void 0 : b.enabled); return a.isNull && c.keyboardNavigation.seriesNavigation.skipNullPoints || !1 === a.visible || !1 === a.isInside || d || f(a.series) } function a(a, b, c, d) {
                        var e = Infinity, l = b.points.length, f = function (a) { return !(y(a.plotX) && y(a.plotY)) }; if (!f(a)) {
                            for (; l--;) {
                                var m = b.points[l]; if (!f(m) && (m = (a.plotX - m.plotX) * (a.plotX - m.plotX) * (c || 1) + (a.plotY - m.plotY) * (a.plotY - m.plotY) * (d ||
                                    1), m < e)) { e = m; var q = l }
                            } return y(q) ? b.points[q] : void 0
                        }
                    } function c(a) { var b = !1; delete a.highlightedPoint; return b = a.series.reduce(function (a, b) { return a || b.highlightFirstValidPoint() }, !1) } function d(a, b) { this.keyCodes = b; this.chart = a } var l = p.seriesTypes, y = t.defined, G = t.extend, E = t.fireEvent, x = u.getPointFromXY, w = u.getSeriesFromName, F = u.scrollToPoint; n.prototype.keyboardMoveVertical = !0;["column", "pie"].forEach(function (a) { l[a] && (l[a].prototype.keyboardMoveVertical = !1) }); k.prototype.highlight = function () {
                        var a =
                            this.series.chart; if (this.isNull) a.tooltip && a.tooltip.hide(0); else this.onMouseOver(); F(this); this.graphic && a.setFocusToElement(this.graphic); a.highlightedPoint = this; return this
                    }; b.prototype.highlightAdjacentPoint = function (a) {
                        var b = this.series, c = this.highlightedPoint, d = c && r(c) || 0, l = c && c.series.points, g = this.series && this.series[this.series.length - 1]; g = g && g.points && g.points[g.points.length - 1]; if (!b[0] || !b[0].points) return !1; if (c) {
                            if (b = b[c.series.index + (a ? 1 : -1)], d = l[d + (a ? 1 : -1)], !d && b && (d = b.points[a ?
                                0 : b.points.length - 1]), !d) return !1
                        } else d = a ? b[0].points[0] : g; return e(d) ? (b = d.series, f(b) ? this.highlightedPoint = a ? b.points[b.points.length - 1] : b.points[0] : this.highlightedPoint = d, this.highlightAdjacentPoint(a)) : d.highlight()
                    }; n.prototype.highlightFirstValidPoint = function () { var a = this.chart.highlightedPoint, b = (a && a.series) === this ? r(a) : 0; a = this.points; var c = a.length; if (a && c) { for (var d = b; d < c; ++d)if (!e(a[d])) return a[d].highlight(); for (; 0 <= b; --b)if (!e(a[b])) return a[b].highlight() } return !1 }; b.prototype.highlightAdjacentSeries =
                        function (b) { var c, d = this.highlightedPoint; var e = (c = this.series && this.series[this.series.length - 1]) && c.points && c.points[c.points.length - 1]; if (!this.highlightedPoint) return c = b ? this.series && this.series[0] : c, (e = b ? c && c.points && c.points[0] : e) ? e.highlight() : !1; c = this.series[d.series.index + (b ? -1 : 1)]; if (!c) return !1; e = a(d, c, 4); if (!e) return !1; if (f(c)) return e.highlight(), b = this.highlightAdjacentSeries(b), b ? b : (d.highlight(), !1); e.highlight(); return e.series.highlightFirstValidPoint() }; b.prototype.highlightAdjacentPointVertical =
                            function (a) { var b = this.highlightedPoint, c = Infinity, d; if (!y(b.plotX) || !y(b.plotY)) return !1; this.series.forEach(function (l) { f(l) || l.points.forEach(function (f) { if (y(f.plotY) && y(f.plotX) && f !== b) { var g = f.plotY - b.plotY, m = Math.abs(f.plotX - b.plotX); m = Math.abs(g) * Math.abs(g) + m * m * 4; l.yAxis && l.yAxis.reversed && (g *= -1); !(0 >= g && a || 0 <= g && !a || 5 > m || e(f)) && m < c && (c = m, d = f) } }) }); return d ? d.highlight() : !1 }; G(d.prototype, {
                                init: function () {
                                    var a = this, b = this.chart, d = this.eventProvider = new h; d.addEvent(n, "destroy", function () { return a.onSeriesDestroy(this) });
                                    d.addEvent(b, "afterDrilldown", function () { c(this); this.focusElement && this.focusElement.removeFocusBorder() }); d.addEvent(b, "drilldown", function (b) { b = b.point; var c = b.series; a.lastDrilledDownPoint = { x: b.x, y: b.y, seriesName: c ? c.name : "" } }); d.addEvent(b, "drillupall", function () { setTimeout(function () { a.onDrillupAll() }, 10) })
                                }, onDrillupAll: function () {
                                    var a = this.lastDrilledDownPoint, b = this.chart, c = a && w(b, a.seriesName), d; a && c && y(a.x) && y(a.y) && (d = x(c, a.x, a.y)); b.container && b.container.focus(); d && d.highlight && d.highlight();
                                    b.focusElement && b.focusElement.removeFocusBorder()
                                }, getKeyboardNavigationHandler: function () {
                                    var a = this, b = this.keyCodes, c = this.chart, d = c.inverted; return new g(c, {
                                        keyCodeMap: [[d ? [b.up, b.down] : [b.left, b.right], function (b) { return a.onKbdSideways(this, b) }], [d ? [b.left, b.right] : [b.up, b.down], function (b) { return a.onKbdVertical(this, b) }], [[b.enter, b.space], function (a, b) { if (a = c.highlightedPoint) E(a.series, "click", G(b, { point: a })), a.firePointEvent("click"); return this.response.success }]], init: function (b) {
                                            return a.onHandlerInit(this,
                                                b)
                                        }, terminate: function () { return a.onHandlerTerminate() }
                                    })
                                }, onKbdSideways: function (a, b) { var c = this.keyCodes; return this.attemptHighlightAdjacentPoint(a, b === c.right || b === c.down) }, onKbdVertical: function (a, b) {
                                    var c = this.chart, d = this.keyCodes; b = b === d.down || b === d.right; d = c.options.accessibility.keyboardNavigation.seriesNavigation; if (d.mode && "serialize" === d.mode) return this.attemptHighlightAdjacentPoint(a, b); c[c.highlightedPoint && c.highlightedPoint.series.keyboardMoveVertical ? "highlightAdjacentPointVertical" :
                                        "highlightAdjacentSeries"](b); return a.response.success
                                }, onHandlerInit: function (a, b) { var d = this.chart; if (0 < b) c(d); else { b = d.series.length; for (var e; b-- && !(d.highlightedPoint = d.series[b].points[d.series[b].points.length - 1], e = d.series[b].highlightFirstValidPoint());); } return a.response.success }, onHandlerTerminate: function () { var a, b, c = this.chart, d = c.highlightedPoint; null === (a = c.tooltip) || void 0 === a ? void 0 : a.hide(0); null === (b = null === d || void 0 === d ? void 0 : d.onMouseOut) || void 0 === b ? void 0 : b.call(d); delete c.highlightedPoint },
                                attemptHighlightAdjacentPoint: function (a, b) { var c = this.chart, d = c.options.accessibility.keyboardNavigation.wrapAround; return c.highlightAdjacentPoint(b) ? a.response.success : d ? a.init(b ? 1 : -1) : a.response[b ? "next" : "prev"] }, onSeriesDestroy: function (a) { var b = this.chart; b.highlightedPoint && b.highlightedPoint.series === a && (delete b.highlightedPoint, b.focusElement && b.focusElement.removeFocusBorder()) }, destroy: function () { this.eventProvider.removeAddedEvents() }
                            }); return d
                }); w(b, "Accessibility/Components/AnnotationsA11y.js",
                    [b["Accessibility/Utils/HTMLUtilities.js"]], function (b) {
                        function k(b) { return (b.annotations || []).reduce(function (b, f) { var e; !1 !== (null === (e = f.options) || void 0 === e ? void 0 : e.visible) && (b = b.concat(f.labels)); return b }, []) } function n(b) { var g, f, e, a, c = null === (f = null === (g = b.options) || void 0 === g ? void 0 : g.accessibility) || void 0 === f ? void 0 : f.description; return c ? c : (null === (a = null === (e = b.graphic) || void 0 === e ? void 0 : e.text) || void 0 === a ? void 0 : a.textStr) || "" } function p(b) {
                            var g, f, e = null === (f = null === (g = b.options) ||
                                void 0 === g ? void 0 : g.accessibility) || void 0 === f ? void 0 : f.description; if (e) return e; g = b.chart; e = n(b); var a = b.points.filter(function (a) { return !!a.graphic }).map(function (a) {
                                    var b, c; if (!(c = null === (b = null === a || void 0 === a ? void 0 : a.accessibility) || void 0 === b ? void 0 : b.valueDescription)) { var d, e; c = (null === (e = null === (d = null === a || void 0 === a ? void 0 : a.graphic) || void 0 === d ? void 0 : d.element) || void 0 === e ? void 0 : e.getAttribute("aria-label")) || "" } a = (null === a || void 0 === a ? void 0 : a.series.name) || ""; return (a ? a + ", " : "") +
                                        "data point " + c
                                }).filter(function (a) { return !!a }), c = a.length; f = "accessibility.screenReaderSection.annotations.description" + (1 < c ? "MultiplePoints" : c ? "SinglePoint" : "NoPoints"); b = { annotationText: e, annotation: b, numPoints: c, annotationPoint: a[0], additionalAnnotationPoints: a.slice(1) }; return g.langFormat(f, b)
                        } function t(b) { return k(b).map(function (b) { return (b = g(h(p(b)))) ? "<li>" + b + "</li>" : "" }) } var g = b.escapeStringForHTML, h = b.stripHTMLTagsFromString; return {
                            getAnnotationsInfoHTML: function (b) {
                                var g = b.annotations;
                                return g && g.length ? '<ul style="list-style-type: none">' + t(b).join(" ") + "</ul>" : ""
                            }, getAnnotationLabelDescription: p, getAnnotationListItems: t, getPointAnnotationTexts: function (b) { var g = k(b.series.chart).filter(function (f) { return -1 < f.points.indexOf(b) }); return g.length ? g.map(function (b) { return "" + n(b) }) : [] }
                        }
                    }); w(b, "Accessibility/Components/SeriesComponent/SeriesDescriber.js", [b["Accessibility/Components/AnnotationsA11y.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/HTMLUtilities.js"],
                    b["Core/Tooltip.js"], b["Core/Utilities.js"]], function (b, k, n, p, t) {
                        function g(a) { var b = a.index; return a.series && a.series.data && J(b) ? K(a.series.data, function (a) { return !!(a && "undefined" !== typeof a.index && a.index > b && a.graphic && a.graphic.element) }) || null : null } function h(a) { var b = a.chart.options.accessibility.series.pointDescriptionEnabledThreshold; return !!(!1 !== b && a.points && a.points.length >= b) } function u(a) { var b = a.options.accessibility || {}; return !h(a) && !b.exposeAsGroupOnly } function r(a) {
                            var b = a.chart.options.accessibility.keyboardNavigation.seriesNavigation;
                            return !(!a.points || !(a.points.length < b.pointNavigationEnabledThreshold || !1 === b.pointNavigationEnabledThreshold))
                        } function f(a, b) { var c = a.series.chart, d = c.options.accessibility.point || {}; a = a.series.tooltipOptions || {}; c = c.options.lang; return q(b) ? C(b, d.valueDecimals || a.valueDecimals || -1, c.decimalPoint, c.accessibility.thousandsSep || c.thousandsSep) : b } function e(a) {
                            var b = (a.options.accessibility || {}).description; return b && a.chart.langFormat("accessibility.series.description", { description: b, series: a }) ||
                                ""
                        } function a(a, b) { return a.chart.langFormat("accessibility.series." + b + "Description", { name: H(a[b]), series: a }) } function c(a) { var b = a.series, c = b.chart, d = c.options.accessibility.point || {}; if (b.xAxis && b.xAxis.dateTime) return b = p.prototype.getXDateFormat.call({ getDateFormat: p.prototype.getDateFormat, chart: c }, a, c.options.tooltip, b.xAxis), d = d.dateFormatter && d.dateFormatter(a) || d.dateFormat || b, c.time.dateFormat(d, a.x, void 0) } function d(a) {
                            var b = c(a), d = (a.series.xAxis || {}).categories && J(a.category) && ("" + a.category).replace("<br/>",
                                " "), e = a.id && 0 > a.id.indexOf("highcharts-"), q = "x, " + a.x; return a.name || b || d || (e ? a.id : q)
                        } function l(a, b, c) { var d = b || "", e = c || ""; return a.series.pointArrayMap.reduce(function (b, c) { b += b.length ? ", " : ""; var q = f(a, I(a[c], a.options[c])); return b + (c + ": " + d + q + e) }, "") } function y(a) {
                            var b = a.series, c = b.chart.options.accessibility.point || {}, d = b.tooltipOptions || {}, e = c.valuePrefix || d.valuePrefix || ""; c = c.valueSuffix || d.valueSuffix || ""; d = f(a, a["undefined" !== typeof a.value ? "value" : "y"]); return a.isNull ? b.chart.langFormat("accessibility.series.nullPointValue",
                                { point: a }) : b.pointArrayMap ? l(a, e, c) : e + d + c
                        } function G(a) { var b = a.series, c = b.chart, e = c.options.accessibility.point.valueDescriptionFormat, q = (b = I(b.xAxis && b.xAxis.options.accessibility && b.xAxis.options.accessibility.enabled, !c.angular)) ? d(a) : ""; a = { point: a, index: J(a.index) ? a.index + 1 : "", xDescription: q, value: y(a), separator: b ? ", " : "" }; return m(e, a, c) } function E(a) {
                            var b = a.series, c = b.chart, d = G(a), e = a.options && a.options.accessibility && a.options.accessibility.description; e = e ? " " + e : ""; b = 1 < c.series.length && b.name ?
                                " " + b.name + "." : ""; c = a.series.chart; var q = F(a), l = { point: a, annotations: q }; c = q.length ? c.langFormat("accessibility.series.pointAnnotationsDescription", l) : ""; a.accessibility = a.accessibility || {}; a.accessibility.valueDescription = d; return d + e + b + (c ? " " + c : "")
                        } function x(a) {
                            var b = u(a), c = r(a); (b || c) && a.points.forEach(function (a) {
                                var c, d, e; if (!(e = a.graphic && a.graphic.element) && (e = a.series && a.series.is("sunburst"), e = a.isNull && !e)) {
                                    var q = a.series, l = g(a); q = (e = l && l.graphic) ? e.parentGroup : q.graph || q.group; l = l ? {
                                        x: I(a.plotX,
                                            l.plotX, 0), y: I(a.plotY, l.plotY, 0)
                                    } : { x: I(a.plotX, 0), y: I(a.plotY, 0) }; l = a.series.chart.renderer.rect(l.x, l.y, 1, 1); l.attr({ "class": "highcharts-a11y-dummy-point", fill: "none", opacity: 0, "fill-opacity": 0, "stroke-opacity": 0 }); q && q.element ? (a.graphic = l, a.hasDummyGraphic = !0, l.add(q), q.element.insertBefore(l.element, e ? e.element : null), e = l.element) : e = void 0
                                } q = !1 === (null === (d = null === (c = a.options) || void 0 === c ? void 0 : c.accessibility) || void 0 === d ? void 0 : d.enabled); e && (e.setAttribute("tabindex", "-1"), e.style.outline =
                                    "0", b && !q ? (d = a.series, c = d.chart.options.accessibility.point || {}, d = d.options.accessibility || {}, a = D(d.pointDescriptionFormatter && d.pointDescriptionFormatter(a) || c.descriptionFormatter && c.descriptionFormatter(a) || E(a)), e.setAttribute("role", "img"), e.setAttribute("aria-label", a)) : e.setAttribute("aria-hidden", !0))
                            })
                        } function w(b) {
                            var c = b.chart, d = c.types || [], q = e(b), l = function (a) { return c[a] && 1 < c[a].length && b[a] }, f = a(b, "xAxis"), m = a(b, "yAxis"), g = {
                                name: b.name || "", ix: b.index + 1, numSeries: c.series && c.series.length,
                                numPoints: b.points && b.points.length, series: b
                            }; d = 1 < d.length ? "Combination" : ""; return (c.langFormat("accessibility.series.summary." + b.type + d, g) || c.langFormat("accessibility.series.summary.default" + d, g)) + (q ? " " + q : "") + (l("yAxis") ? " " + m : "") + (l("xAxis") ? " " + f : "")
                        } var F = b.getPointAnnotationTexts, H = k.getAxisDescription, A = k.getSeriesFirstPointElement, z = k.getSeriesA11yElement, B = k.unhideChartElementFromAT, v = n.reverseChildNodes, D = n.stripHTMLTagsFromString, K = t.find, m = t.format, q = t.isNumber, C = t.numberFormat, I = t.pick,
                            J = t.defined; return {
                                describeSeries: function (a) {
                                    var b = a.chart, c = A(a), d = z(a), e = b.is3d && b.is3d(); if (d) {
                                        d.lastChild !== c || e || v(d); x(a); B(b, d); e = a.chart; b = e.options.chart || {}; c = 1 < e.series.length; e = e.options.accessibility.series.describeSingleSeries; var q = (a.options.accessibility || {}).exposeAsGroupOnly; b.options3d && b.options3d.enabled && c || !(c || e || q || h(a)) ? d.setAttribute("aria-label", "") : (b = a.chart.options.accessibility, c = b.landmarkVerbosity, (a.options.accessibility || {}).exposeAsGroupOnly ? d.setAttribute("role",
                                            "img") : "all" === c && d.setAttribute("role", "region"), d.setAttribute("tabindex", "-1"), d.style.outline = "0", d.setAttribute("aria-label", D(b.series.descriptionFormatter && b.series.descriptionFormatter(a) || w(a))))
                                    }
                                }, defaultPointDescriptionFormatter: E, defaultSeriesDescriptionFormatter: w, getPointA11yTimeDescription: c, getPointXDescription: d, getPointValue: y, getPointValueDescription: G
                            }
                    }); w(b, "Accessibility/Utils/Announcer.js", [b["Core/Globals.js"], b["Core/Renderer/HTML/AST.js"], b["Accessibility/Utils/DOMElementProvider.js"],
                    b["Accessibility/Utils/HTMLUtilities.js"]], function (b, k, n, p) {
                        var t = b.doc, g = p.setElAttrs, h = p.visuallyHideElement; p = function () {
                            function b(b, f) { this.chart = b; this.domElementProvider = new n; this.announceRegion = this.addAnnounceRegion(f) } b.prototype.destroy = function () { this.domElementProvider.destroyCreatedElements() }; b.prototype.announce = function (b) {
                                var f = this; k.setElementHTML(this.announceRegion, b); this.clearAnnouncementRegionTimer && clearTimeout(this.clearAnnouncementRegionTimer); this.clearAnnouncementRegionTimer =
                                    setTimeout(function () { f.announceRegion.innerHTML = ""; delete f.clearAnnouncementRegionTimer }, 1E3)
                            }; b.prototype.addAnnounceRegion = function (b) { var f = this.chart.announcerContainer || this.createAnnouncerContainer(), e = this.domElementProvider.createElement("div"); g(e, { "aria-hidden": !1, "aria-live": b }); h(e); f.appendChild(e); return e }; b.prototype.createAnnouncerContainer = function () {
                                var b = this.chart, f = t.createElement("div"); g(f, { "aria-hidden": !1, style: "position:relative", "class": "highcharts-announcer-container" });
                                b.renderTo.insertBefore(f, b.renderTo.firstChild); return b.announcerContainer = f
                            }; return b
                        }(); return b.Announcer = p
                    }); w(b, "Accessibility/Components/SeriesComponent/NewDataAnnouncer.js", [b["Core/Globals.js"], b["Core/Series/Series.js"], b["Core/Utilities.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Components/SeriesComponent/SeriesDescriber.js"], b["Accessibility/Utils/Announcer.js"], b["Accessibility/Utils/EventProvider.js"]], function (b, k, n, p, t, g, h) {
                        function u(a) {
                            var b = a.series.data.filter(function (b) {
                                return a.x ===
                                    b.x && a.y === b.y
                            }); return 1 === b.length ? b[0] : a
                        } function r(a, b) { var c = (a || []).concat(b || []).reduce(function (a, b) { a[b.name + b.index] = b; return a }, {}); return Object.keys(c).map(function (a) { return c[a] }) } var f = n.extend, e = n.defined, a = p.getChartTitle, c = t.defaultPointDescriptionFormatter, d = t.defaultSeriesDescriptionFormatter; n = function (a) { this.chart = a }; f(n.prototype, {
                            init: function () {
                                var a = this.chart, b = a.options.accessibility.announceNewData.interruptUser ? "assertive" : "polite"; this.lastAnnouncementTime = 0; this.dirty =
                                    { allSeries: {} }; this.eventProvider = new h; this.announcer = new g(a, b); this.addEventListeners()
                            }, destroy: function () { this.eventProvider.removeAddedEvents(); this.announcer.destroy() }, addEventListeners: function () {
                                var a = this, b = this.chart, c = this.eventProvider; c.addEvent(b, "afterDrilldown", function () { a.lastAnnouncementTime = 0 }); c.addEvent(k, "updatedData", function () { a.onSeriesUpdatedData(this) }); c.addEvent(b, "afterAddSeries", function (b) { a.onSeriesAdded(b.series) }); c.addEvent(k, "addPoint", function (b) { a.onPointAdded(b.point) });
                                c.addEvent(b, "redraw", function () { a.announceDirtyData() })
                            }, onSeriesUpdatedData: function (a) { var b = this.chart; a.chart === b && b.options.accessibility.announceNewData.enabled && (this.dirty.hasDirty = !0, this.dirty.allSeries[a.name + a.index] = a) }, onSeriesAdded: function (a) { this.chart.options.accessibility.announceNewData.enabled && (this.dirty.hasDirty = !0, this.dirty.allSeries[a.name + a.index] = a, this.dirty.newSeries = e(this.dirty.newSeries) ? void 0 : a) }, onPointAdded: function (a) {
                                var b = a.series.chart; this.chart === b && b.options.accessibility.announceNewData.enabled &&
                                    (this.dirty.newPoint = e(this.dirty.newPoint) ? void 0 : a)
                            }, announceDirtyData: function () { var a = this; if (this.chart.options.accessibility.announceNewData && this.dirty.hasDirty) { var b = this.dirty.newPoint; b && (b = u(b)); this.queueAnnouncement(Object.keys(this.dirty.allSeries).map(function (b) { return a.dirty.allSeries[b] }), this.dirty.newSeries, b); this.dirty = { allSeries: {} } } }, queueAnnouncement: function (a, b, c) {
                                var d = this, e = this.chart.options.accessibility.announceNewData; if (e.enabled) {
                                    var f = +new Date; e = Math.max(0,
                                        e.minAnnounceInterval - (f - this.lastAnnouncementTime)); a = r(this.queuedAnnouncement && this.queuedAnnouncement.series, a); if (b = this.buildAnnouncementMessage(a, b, c)) this.queuedAnnouncement && clearTimeout(this.queuedAnnouncementTimer), this.queuedAnnouncement = { time: f, message: b, series: a }, this.queuedAnnouncementTimer = setTimeout(function () { d && d.announcer && (d.lastAnnouncementTime = +new Date, d.announcer.announce(d.queuedAnnouncement.message), delete d.queuedAnnouncement, delete d.queuedAnnouncementTimer) }, e)
                                }
                            }, buildAnnouncementMessage: function (e,
                                f, g) { var l = this.chart, h = l.options.accessibility.announceNewData; if (h.announcementFormatter && (e = h.announcementFormatter(e, f, g), !1 !== e)) return e.length ? e : null; e = b.charts && 1 < b.charts.length ? "Multiple" : "Single"; e = f ? "newSeriesAnnounce" + e : g ? "newPointAnnounce" + e : "newDataAnnounce"; h = a(l); return l.langFormat("accessibility.announceNewData." + e, { chartTitle: h, seriesDesc: f ? d(f) : null, pointDesc: g ? c(g) : null, point: g, series: f }) }
                        }); return n
                    }); w(b, "Accessibility/Components/SeriesComponent/ForcedMarkers.js", [b["Core/Series/Series.js"],
                    b["Core/Utilities.js"]], function (b, k) {
                        function n(b) { t(!0, b, { marker: { enabled: !0, states: { normal: { opacity: 0 } } } }) } var p = k.addEvent, t = k.merge; return function () {
                            p(b, "render", function () {
                                var b = this.options, h = !1 !== (this.options.accessibility && this.options.accessibility.enabled); if (h = this.chart.options.accessibility.enabled && h) h = this.chart.options.accessibility, h = this.points.length < h.series.pointDescriptionEnabledThreshold || !1 === h.series.pointDescriptionEnabledThreshold; if (h) {
                                    if (b.marker && !1 === b.marker.enabled &&
                                        (this.a11yMarkersForced = !0, n(this.options)), this._hasPointMarkers && this.points && this.points.length) for (b = this.points.length; b--;) { h = this.points[b]; var k = h.options; delete h.hasForcedA11yMarker; k.marker && (k.marker.enabled ? (t(!0, k.marker, { states: { normal: { opacity: k.marker.states && k.marker.states.normal && k.marker.states.normal.opacity || 1 } } }), h.hasForcedA11yMarker = !1) : (n(k), h.hasForcedA11yMarker = !0)) }
                                } else this.a11yMarkersForced && (delete this.a11yMarkersForced, (b = this.resetA11yMarkerOptions) && t(!0, this.options,
                                    { marker: { enabled: b.enabled, states: { normal: { opacity: b.states && b.states.normal && b.states.normal.opacity } } } }))
                            }); p(b, "afterSetOptions", function (b) { this.resetA11yMarkerOptions = t(b.options.marker || {}, this.userOptions.marker || {}) }); p(b, "afterRender", function () {
                                if (this.chart.styledMode) {
                                    if (this.markerGroup) this.markerGroup[this.a11yMarkersForced ? "addClass" : "removeClass"]("highcharts-a11y-markers-hidden"); this._hasPointMarkers && this.points && this.points.length && this.points.forEach(function (b) {
                                        b.graphic && (b.graphic[b.hasForcedA11yMarker ?
                                            "addClass" : "removeClass"]("highcharts-a11y-marker-hidden"), b.graphic[!1 === b.hasForcedA11yMarker ? "addClass" : "removeClass"]("highcharts-a11y-marker-visible"))
                                    })
                                }
                            })
                        }
                    }); w(b, "Accessibility/Components/SeriesComponent/SeriesComponent.js", [b["Core/Globals.js"], b["Core/Utilities.js"], b["Accessibility/AccessibilityComponent.js"], b["Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js"], b["Accessibility/Components/SeriesComponent/NewDataAnnouncer.js"], b["Accessibility/Components/SeriesComponent/ForcedMarkers.js"],
                    b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Components/SeriesComponent/SeriesDescriber.js"], b["Core/Tooltip.js"]], function (b, k, n, p, t, g, h, u, r) {
                        k = k.extend; var f = h.hideSeriesFromAT, e = u.describeSeries; b.SeriesAccessibilityDescriber = u; g(); b = function () { }; b.prototype = new n; k(b.prototype, {
                            init: function () {
                                this.newDataAnnouncer = new t(this.chart); this.newDataAnnouncer.init(); this.keyboardNavigation = new p(this.chart, this.keyCodes); this.keyboardNavigation.init(); this.hideTooltipFromATWhenShown();
                                this.hideSeriesLabelsFromATWhenShown()
                            }, hideTooltipFromATWhenShown: function () { var a = this; this.addEvent(r, "refresh", function () { this.chart === a.chart && this.label && this.label.element && this.label.element.setAttribute("aria-hidden", !0) }) }, hideSeriesLabelsFromATWhenShown: function () { this.addEvent(this.chart, "afterDrawSeriesLabels", function () { this.series.forEach(function (a) { a.labelBySeries && a.labelBySeries.attr("aria-hidden", !0) }) }) }, onChartRender: function () {
                                this.chart.series.forEach(function (a) {
                                    !1 !== (a.options.accessibility &&
                                        a.options.accessibility.enabled) && a.visible ? e(a) : f(a)
                                })
                            }, getKeyboardNavigation: function () { return this.keyboardNavigation.getKeyboardNavigationHandler() }, destroy: function () { this.newDataAnnouncer.destroy(); this.keyboardNavigation.destroy() }
                        }); return b
                    }); w(b, "Accessibility/Components/ZoomComponent.js", [b["Accessibility/AccessibilityComponent.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Core/Globals.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Core/Utilities.js"]],
                        function (b, k, n, p, t, g) {
                            var h = k.unhideChartElementFromAT; k = n.noop; var u = p.removeElement, r = p.setElAttrs; p = g.extend; var f = g.pick; n.Axis.prototype.panStep = function (b, a) { var c = a || 3; a = this.getExtremes(); var d = (a.max - a.min) / c * b; c = a.max + d; d = a.min + d; var e = c - d; 0 > b && d < a.dataMin ? (d = a.dataMin, c = d + e) : 0 < b && c > a.dataMax && (c = a.dataMax, d = c - e); this.setExtremes(d, c) }; k.prototype = new b; p(k.prototype, {
                                init: function () {
                                    var b = this, a = this.chart;["afterShowResetZoom", "afterDrilldown", "drillupall"].forEach(function (c) {
                                        b.addEvent(a,
                                            c, function () { b.updateProxyOverlays() })
                                    })
                                }, onChartUpdate: function () { var b = this.chart, a = this; b.mapNavButtons && b.mapNavButtons.forEach(function (c, d) { h(b, c.element); a.setMapNavButtonAttrs(c.element, "accessibility.zoom.mapZoom" + (d ? "Out" : "In")) }) }, setMapNavButtonAttrs: function (b, a) { var c = this.chart; a = c.langFormat(a, { chart: c }); r(b, { tabindex: -1, role: "button", "aria-label": a }) }, onChartRender: function () { this.updateProxyOverlays() }, updateProxyOverlays: function () {
                                    var b = this.chart; u(this.drillUpProxyGroup); u(this.resetZoomProxyGroup);
                                    b.resetZoomButton && this.recreateProxyButtonAndGroup(b.resetZoomButton, "resetZoomProxyButton", "resetZoomProxyGroup", b.langFormat("accessibility.zoom.resetZoomButton", { chart: b })); b.drillUpButton && this.recreateProxyButtonAndGroup(b.drillUpButton, "drillUpProxyButton", "drillUpProxyGroup", b.langFormat("accessibility.drillUpButton", { chart: b, buttonText: b.getDrilldownBackText() }))
                                }, recreateProxyButtonAndGroup: function (b, a, c, d) {
                                    u(this[c]); this[c] = this.addProxyGroup(); this[a] = this.createProxyButton(b, this[c],
                                        { "aria-label": d, tabindex: -1 })
                                }, getMapZoomNavigation: function () { var b = this.keyCodes, a = this.chart, c = this; return new t(a, { keyCodeMap: [[[b.up, b.down, b.left, b.right], function (a) { return c.onMapKbdArrow(this, a) }], [[b.tab], function (a, b) { return c.onMapKbdTab(this, b) }], [[b.space, b.enter], function () { return c.onMapKbdClick(this) }]], validate: function () { return !!(a.mapZoom && a.mapNavButtons && a.mapNavButtons.length) }, init: function (a) { return c.onMapNavInit(a) } }) }, onMapKbdArrow: function (b, a) {
                                    var c = this.keyCodes; this.chart[a ===
                                        c.up || a === c.down ? "yAxis" : "xAxis"][0].panStep(a === c.left || a === c.up ? -1 : 1); return b.response.success
                                }, onMapKbdTab: function (b, a) { var c = this.chart; b = b.response; var d = (a = a.shiftKey) && !this.focusedMapNavButtonIx || !a && this.focusedMapNavButtonIx; c.mapNavButtons[this.focusedMapNavButtonIx].setState(0); if (d) return c.mapZoom(), b[a ? "prev" : "next"]; this.focusedMapNavButtonIx += a ? -1 : 1; a = c.mapNavButtons[this.focusedMapNavButtonIx]; c.setFocusToElement(a.box, a.element); a.setState(2); return b.success }, onMapKbdClick: function (b) {
                                    this.fakeClickEvent(this.chart.mapNavButtons[this.focusedMapNavButtonIx].element);
                                    return b.response.success
                                }, onMapNavInit: function (b) { var a = this.chart, c = a.mapNavButtons[0], d = a.mapNavButtons[1]; c = 0 < b ? c : d; a.setFocusToElement(c.box, c.element); c.setState(2); this.focusedMapNavButtonIx = 0 < b ? 0 : 1 }, simpleButtonNavigation: function (b, a, c) {
                                    var d = this.keyCodes, e = this, g = this.chart; return new t(g, {
                                        keyCodeMap: [[[d.tab, d.up, d.down, d.left, d.right], function (a, b) { return this.response[a === d.tab && b.shiftKey || a === d.left || a === d.up ? "prev" : "next"] }], [[d.space, d.enter], function () {
                                            var a = c(this, g); return f(a,
                                                this.response.success)
                                        }]], validate: function () { return g[b] && g[b].box && e[a] }, init: function () { g.setFocusToElement(g[b].box, e[a]) }
                                    })
                                }, getKeyboardNavigation: function () { return [this.simpleButtonNavigation("resetZoomButton", "resetZoomProxyButton", function (b, a) { a.zoomOut() }), this.simpleButtonNavigation("drillUpButton", "drillUpProxyButton", function (b, a) { a.drillUp(); return b.response.prev }), this.getMapZoomNavigation()] }
                            }); return k
                        }); w(b, "Extensions/RangeSelector.js", [b["Core/Axis/Axis.js"], b["Core/Chart/Chart.js"],
                        b["Core/Globals.js"], b["Core/Options.js"], b["Core/Color/Palette.js"], b["Core/Renderer/SVG/SVGElement.js"], b["Core/Utilities.js"]], function (b, k, n, p, t, g, h) {
                            function u(a) { if (-1 !== a.indexOf("%L")) return "text"; var b = "aAdewbBmoyY".split("").some(function (b) { return -1 !== a.indexOf("%" + b) }), c = "HkIlMS".split("").some(function (b) { return -1 !== a.indexOf("%" + b) }); return b && c ? "datetime-local" : b ? "date" : c ? "time" : "text" } var r = p.defaultOptions, f = h.addEvent, e = h.createElement, a = h.css, c = h.defined, d = h.destroyObjectProperties,
                                l = h.discardElement, y = h.extend, G = h.find, E = h.fireEvent, x = h.isNumber, w = h.merge, F = h.objectEach, H = h.pad, A = h.pick, z = h.pInt, B = h.splat; y(r, {
                                    rangeSelector: {
                                        allButtonsEnabled: !1, buttons: void 0, buttonSpacing: 5, dropdown: "responsive", enabled: void 0, verticalAlign: "top", buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 }, floating: !1, x: 0, y: 0, height: void 0, inputBoxBorderColor: "none", inputBoxHeight: 17, inputBoxWidth: void 0, inputDateFormat: "%b %e, %Y", inputDateParser: void 0, inputEditDateFormat: "%Y-%m-%d", inputEnabled: !0,
                                        inputPosition: { align: "right", x: 0, y: 0 }, inputSpacing: 5, selected: void 0, buttonPosition: { align: "left", x: 0, y: 0 }, inputStyle: { color: t.highlightColor80, cursor: "pointer" }, labelStyle: { color: t.neutralColor60 }
                                    }
                                }); y(r.lang, { rangeSelectorZoom: "Zoom", rangeSelectorFrom: "", rangeSelectorTo: "\u2192" }); var v = function () {
                                    function m(a) { this.buttons = void 0; this.buttonOptions = m.prototype.defaultButtons; this.initialButtonGroupWidth = 0; this.options = void 0; this.chart = a; this.init(a) } m.prototype.clickButton = function (a, d) {
                                        var e =
                                            this.chart, q = this.buttonOptions[a], m = e.xAxis[0], g = e.scroller && e.scroller.getUnionExtremes() || m || {}, l = g.dataMin, C = g.dataMax, h = m && Math.round(Math.min(m.max, A(C, m.max))), k = q.type; g = q._range; var z, y = q.dataGrouping; if (null !== l && null !== C) {
                                                e.fixedRange = g; y && (this.forcedDataGrouping = !0, b.prototype.setDataGrouping.call(m || { chart: this.chart }, y, !1), this.frozenStates = q.preserveDataGrouping); if ("month" === k || "year" === k) if (m) {
                                                    k = { range: q, max: h, chart: e, dataMin: l, dataMax: C }; var v = m.minFromRange.call(k); x(k.newMax) &&
                                                        (h = k.newMax)
                                                } else g = q; else if (g) v = Math.max(h - g, l), h = Math.min(v + g, C); else if ("ytd" === k) if (m) "undefined" === typeof C && (l = Number.MAX_VALUE, C = Number.MIN_VALUE, e.series.forEach(function (a) { a = a.xData; l = Math.min(a[0], l); C = Math.max(a[a.length - 1], C) }), d = !1), h = this.getYTDExtremes(C, l, e.time.useUTC), v = z = h.min, h = h.max; else { this.deferredYTDClick = a; return } else "all" === k && m && (v = l, h = C); c(v) && (v += q._offsetMin); c(h) && (h += q._offsetMax); this.setSelected(a); this.dropdown && (this.dropdown.selectedIndex = a + 1); if (m) m.setExtremes(v,
                                                    h, A(d, !0), void 0, { trigger: "rangeSelectorButton", rangeSelectorButton: q }); else { var r = B(e.options.xAxis)[0]; var n = r.range; r.range = g; var t = r.min; r.min = z; f(e, "load", function () { r.range = n; r.min = t }) } E(this, "afterBtnClick")
                                            }
                                    }; m.prototype.setSelected = function (a) { this.selected = this.options.selected = a }; m.prototype.init = function (a) {
                                        var b = this, c = a.options.rangeSelector, d = c.buttons || b.defaultButtons.slice(), e = c.selected, q = function () { var a = b.minInput, c = b.maxInput; a && a.blur && E(a, "blur"); c && c.blur && E(c, "blur") }; b.chart =
                                            a; b.options = c; b.buttons = []; b.buttonOptions = d; this.eventsToUnbind = []; this.eventsToUnbind.push(f(a.container, "mousedown", q)); this.eventsToUnbind.push(f(a, "resize", q)); d.forEach(b.computeButtonRange); "undefined" !== typeof e && d[e] && this.clickButton(e, !1); this.eventsToUnbind.push(f(a, "load", function () {
                                                a.xAxis && a.xAxis[0] && f(a.xAxis[0], "setExtremes", function (c) {
                                                    this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && !b.frozenStates && this.setDataGrouping(!1,
                                                        !1)
                                                })
                                            }))
                                    }; m.prototype.updateButtonStates = function () {
                                        var a = this, b = this.chart, c = this.dropdown, d = b.xAxis[0], e = Math.round(d.max - d.min), f = !d.hasVisibleSeries, m = b.scroller && b.scroller.getUnionExtremes() || d, g = m.dataMin, l = m.dataMax; b = a.getYTDExtremes(l, g, b.time.useUTC); var h = b.min, k = b.max, z = a.selected, v = x(z), y = a.options.allButtonsEnabled, r = a.buttons; a.buttonOptions.forEach(function (b, q) {
                                            var m = b._range, C = b.type, J = b.count || 1, I = r[q], L = 0, B = b._offsetMax - b._offsetMin; b = q === z; var O = m > l - g, n = m < d.minRange, t = !1, u = !1;
                                            m = m === e; ("month" === C || "year" === C) && e + 36E5 >= 864E5 * { month: 28, year: 365 }[C] * J - B && e - 36E5 <= 864E5 * { month: 31, year: 366 }[C] * J + B ? m = !0 : "ytd" === C ? (m = k - h + B === e, t = !b) : "all" === C && (m = d.max - d.min >= l - g, u = !b && v && m); C = !y && (O || n || u || f); J = b && m || m && !v && !t || b && a.frozenStates; C ? L = 3 : J && (v = !0, L = 2); I.state !== L && (I.setState(L), c && (c.options[q + 1].disabled = C, 2 === L && (c.selectedIndex = q + 1)), 0 === L && z === q && a.setSelected())
                                        })
                                    }; m.prototype.computeButtonRange = function (a) {
                                        var b = a.type, c = a.count || 1, d = {
                                            millisecond: 1, second: 1E3, minute: 6E4,
                                            hour: 36E5, day: 864E5, week: 6048E5
                                        }; if (d[b]) a._range = d[b] * c; else if ("month" === b || "year" === b) a._range = 864E5 * { month: 30, year: 365 }[b] * c; a._offsetMin = A(a.offsetMin, 0); a._offsetMax = A(a.offsetMax, 0); a._range += a._offsetMax - a._offsetMin
                                    }; m.prototype.getInputValue = function (a) { a = "min" === a ? this.minInput : this.maxInput; var b = this.chart.options.rangeSelector, c = this.chart.time; return a ? ("text" === a.type && b.inputDateParser || this.defaultInputDateParser)(a.value, c.useUTC, c) : 0 }; m.prototype.setInputValue = function (a, b) {
                                        var d =
                                            this.options, e = this.chart.time, q = "min" === a ? this.minInput : this.maxInput; a = "min" === a ? this.minDateBox : this.maxDateBox; if (q) { var f = q.getAttribute("data-hc-time"); f = c(f) ? Number(f) : void 0; c(b) && (c(f) && q.setAttribute("data-hc-time-previous", f), q.setAttribute("data-hc-time", b), f = b); q.value = e.dateFormat(this.inputTypeFormats[q.type] || d.inputEditDateFormat, f); a && a.attr({ text: e.dateFormat(d.inputDateFormat, f) }) }
                                    }; m.prototype.setInputExtremes = function (a, b, c) {
                                        if (a = "min" === a ? this.minInput : this.maxInput) {
                                            var d =
                                                this.inputTypeFormats[a.type], e = this.chart.time; d && (b = e.dateFormat(d, b), a.min !== b && (a.min = b), c = e.dateFormat(d, c), a.max !== c && (a.max = c))
                                        }
                                    }; m.prototype.showInput = function (b) {
                                        var c = "min" === b ? this.minDateBox : this.maxDateBox; if ((b = "min" === b ? this.minInput : this.maxInput) && c && this.inputGroup) {
                                            var d = "text" === b.type, e = this.inputGroup, q = e.translateX; e = e.translateY; a(b, { width: d ? c.width - 2 + "px" : "auto", height: d ? c.height - 2 + "px" : "auto", border: "2px solid silver" }); d ? a(b, { left: q + c.x + "px", top: e + "px" }) : a(b, {
                                                left: Math.min(Math.round(c.x +
                                                    q - (b.offsetWidth - c.width) / 2), this.chart.chartWidth - b.offsetWidth) + "px", top: e - (b.offsetHeight - c.height) / 2 + "px"
                                            })
                                        }
                                    }; m.prototype.hideInput = function (b) { (b = "min" === b ? this.minInput : this.maxInput) && a(b, { top: "-9999em", border: 0, width: "1px", height: "1px" }) }; m.prototype.defaultInputDateParser = function (a, b, c) {
                                        var d = a.split("/").join("-").split(" ").join("T"); -1 === d.indexOf("T") && (d += "T00:00"); if (b) d += "Z"; else {
                                            var e; if (e = n.isSafari) e = d, e = !(6 < e.length && (e.lastIndexOf("-") === e.length - 6 || e.lastIndexOf("+") === e.length -
                                                6)); e && (e = (new Date(d)).getTimezoneOffset() / 60, d += 0 >= e ? "+" + H(-e) + ":00" : "-" + H(e) + ":00")
                                        } d = Date.parse(d); x(d) || (a = a.split("-"), d = Date.UTC(z(a[0]), z(a[1]) - 1, z(a[2]))); c && b && (d += c.getTimezoneOffset(d)); return d
                                    }; m.prototype.drawInput = function (b) {
                                        function c() {
                                            var a = q.getInputValue(b), c = d.xAxis[0], e = d.scroller && d.scroller.xAxis ? d.scroller.xAxis : c, f = e.dataMin; e = e.dataMax; var m = q.maxInput, g = q.minInput; a !== Number(v.getAttribute("data-hc-time-previous")) && x(a) && (v.setAttribute("data-hc-time-previous", a), k &&
                                                m && x(f) ? a > Number(m.getAttribute("data-hc-time")) ? a = void 0 : a < f && (a = f) : g && x(e) && (a < Number(g.getAttribute("data-hc-time")) ? a = void 0 : a > e && (a = e)), "undefined" !== typeof a && c.setExtremes(k ? a : c.min, k ? c.max : a, void 0, void 0, { trigger: "rangeSelectorInput" }))
                                        } var d = this.chart, f = this.div, m = this.inputGroup, q = this, g = d.renderer.style || {}, l = d.renderer, h = d.options.rangeSelector, k = "min" === b, z = r.lang[k ? "rangeSelectorFrom" : "rangeSelectorTo"]; z = l.label(z, 0).addClass("highcharts-range-label").attr({ padding: z ? 2 : 0 }).add(m);
                                        l = l.label("", 0).addClass("highcharts-range-input").attr({ padding: 2, width: h.inputBoxWidth, height: h.inputBoxHeight, "text-align": "center" }).on("click", function () { q.showInput(b); q[b + "Input"].focus() }); d.styledMode || l.attr({ stroke: h.inputBoxBorderColor, "stroke-width": 1 }); l.add(m); var v = e("input", { name: b, className: "highcharts-range-selector" }, void 0, f); v.setAttribute("type", u(h.inputDateFormat || "%b %e, %Y")); d.styledMode || (z.css(w(g, h.labelStyle)), l.css(w({ color: t.neutralColor80 }, g, h.inputStyle)), a(v, y({
                                            position: "absolute",
                                            border: 0, boxShadow: "0 0 15px rgba(0,0,0,0.3)", width: "1px", height: "1px", padding: 0, textAlign: "center", fontSize: g.fontSize, fontFamily: g.fontFamily, top: "-9999em"
                                        }, h.inputStyle))); v.onfocus = function () { q.showInput(b) }; v.onblur = function () { v === n.doc.activeElement && c(); q.hideInput(b); q.setInputValue(b); v.blur() }; var B = !1; v.onchange = function () { c(); B || (q.hideInput(b), v.blur()) }; v.onkeypress = function (a) { 13 === a.keyCode && c() }; v.onkeydown = function () { B = !0 }; v.onkeyup = function () { B = !1 }; return { dateBox: l, input: v, label: z }
                                    };
                                    m.prototype.getPosition = function () { var a = this.chart, b = a.options.rangeSelector; a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0; return { buttonTop: a + b.buttonPosition.y, inputTop: a + b.inputPosition.y - 10 } }; m.prototype.getYTDExtremes = function (a, b, c) { var d = this.chart.time, e = new d.Date(a), f = d.get("FullYear", e); c = c ? d.Date.UTC(f, 0, 1) : +new d.Date(f, 0, 1); b = Math.max(b, c); e = e.getTime(); return { max: Math.min(a || e, e), min: b } }; m.prototype.render = function (a, b) {
                                        var d = this.chart, f = d.renderer, m = d.container, g = d.options,
                                        q = g.rangeSelector, l = A(g.chart.style && g.chart.style.zIndex, 0) + 1; g = q.inputEnabled; if (!1 !== q.enabled) {
                                            this.rendered || (this.group = f.g("range-selector-group").attr({ zIndex: 7 }).add(), this.div = e("div", void 0, { position: "relative", height: 0, zIndex: l }), this.buttonOptions.length && this.renderButtons(), m.parentNode && m.parentNode.insertBefore(this.div, m), g && (this.inputGroup = f.g("input-group").add(this.group), f = this.drawInput("min"), this.minDateBox = f.dateBox, this.minLabel = f.label, this.minInput = f.input, f = this.drawInput("max"),
                                                this.maxDateBox = f.dateBox, this.maxLabel = f.label, this.maxInput = f.input)); if (g && (this.setInputValue("min", a), this.setInputValue("max", b), a = d.scroller && d.scroller.getUnionExtremes() || d.xAxis[0] || {}, c(a.dataMin) && c(a.dataMax) && (d = d.xAxis[0].minRange || 0, this.setInputExtremes("min", a.dataMin, Math.min(a.dataMax, this.getInputValue("max")) - d), this.setInputExtremes("max", Math.max(a.dataMin, this.getInputValue("min")) + d, a.dataMax)), this.inputGroup)) {
                                                    var h = 0;[this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach(function (a) {
                                                        a &&
                                                        a.width && (a.attr({ x: h }), h += a.width + q.inputSpacing)
                                                    })
                                                } this.alignElements(); this.rendered = !0
                                        }
                                    }; m.prototype.renderButtons = function () {
                                        var a = this, b = this.buttons, c = this.options, d = r.lang, m = this.chart.renderer, g = w(c.buttonTheme), l = g && g.states, h = g.width || 28; delete g.width; this.buttonGroup = m.g("range-selector-buttons").add(this.group); var k = this.dropdown = e("select", void 0, { position: "absolute", width: "1px", height: "1px", padding: 0, border: 0, top: "-9999em", cursor: "pointer", opacity: .0001 }, this.div); f(k, "touchstart",
                                            function () { k.style.fontSize = "16px" });[[n.isMS ? "mouseover" : "mouseenter"], [n.isMS ? "mouseout" : "mouseleave"], ["change", "click"]].forEach(function (c) { var d = c[0], e = c[1]; f(k, d, function () { var c = b[a.currentButtonIndex()]; c && E(c.element, e || d) }) }); this.zoomText = m.text(d.rangeSelectorZoom, 0, 15).add(this.buttonGroup); this.chart.styledMode || (this.zoomText.css(c.labelStyle), g["stroke-width"] = A(g["stroke-width"], 0)); e("option", { textContent: this.zoomText.textStr, disabled: !0 }, void 0, k); this.buttonOptions.forEach(function (c,
                                                d) { e("option", { textContent: c.title || c.text }, void 0, k); b[d] = m.button(c.text, 0, 0, function (b) { var e = c.events && c.events.click, f; e && (f = e.call(c, b)); !1 !== f && a.clickButton(d); a.isActive = !0 }, g, l && l.hover, l && l.select, l && l.disabled).attr({ "text-align": "center", width: h }).add(a.buttonGroup); c.title && b[d].attr("title", c.title) })
                                    }; m.prototype.alignElements = function () {
                                        var a = this, b = this.buttonGroup, c = this.buttons, d = this.chart, e = this.group, f = this.inputGroup, m = this.options, g = this.zoomText, l = d.options, h = l.exporting &&
                                            !1 !== l.exporting.enabled && l.navigation && l.navigation.buttonOptions; l = m.buttonPosition; var k = m.inputPosition, z = m.verticalAlign, v = function (b, c) { return h && a.titleCollision(d) && "top" === z && "right" === c.align && c.y - b.getBBox().height - 12 < (h.y || 0) + (h.height || 0) + d.spacing[0] ? -40 : 0 }, B = d.plotLeft; if (e && l && k) {
                                                var y = l.x - d.spacing[3]; if (b) {
                                                    this.positionButtons(); if (!this.initialButtonGroupWidth) {
                                                        var r = 0; g && (r += g.getBBox().width + 5); c.forEach(function (a, b) { r += a.width; b !== c.length - 1 && (r += m.buttonSpacing) }); this.initialButtonGroupWidth =
                                                            r
                                                    } B -= d.spacing[3]; this.updateButtonStates(); g = v(b, l); this.alignButtonGroup(g); e.placed = b.placed = d.hasLoaded
                                                } b = 0; f && (b = v(f, k), "left" === k.align ? y = B : "right" === k.align && (y = -Math.max(d.axisOffset[1], -b)), f.align({ y: k.y, width: f.getBBox().width, align: k.align, x: k.x + y - 2 }, !0, d.spacingBox), f.placed = d.hasLoaded); this.handleCollision(b); e.align({ verticalAlign: z }, !0, d.spacingBox); f = e.alignAttr.translateY; b = e.getBBox().height + 20; v = 0; "bottom" === z && (v = (v = d.legend && d.legend.options) && "bottom" === v.verticalAlign && v.enabled &&
                                                    !v.floating ? d.legend.legendHeight + A(v.margin, 10) : 0, b = b + v - 20, v = f - b - (m.floating ? 0 : m.y) - (d.titleOffset ? d.titleOffset[2] : 0) - 10); if ("top" === z) m.floating && (v = 0), d.titleOffset && d.titleOffset[0] && (v = d.titleOffset[0]), v += d.margin[0] - d.spacing[0] || 0; else if ("middle" === z) if (k.y === l.y) v = f; else if (k.y || l.y) v = 0 > k.y || 0 > l.y ? v - Math.min(k.y, l.y) : f - b; e.translate(m.x, m.y + Math.floor(v)); l = this.minInput; k = this.maxInput; f = this.dropdown; m.inputEnabled && l && k && (l.style.marginTop = e.translateY + "px", k.style.marginTop = e.translateY +
                                                        "px"); f && (f.style.marginTop = e.translateY + "px")
                                            }
                                    }; m.prototype.alignButtonGroup = function (a, b) { var c = this.chart, d = this.buttonGroup, e = this.options.buttonPosition, f = c.plotLeft - c.spacing[3], m = e.x - c.spacing[3]; "right" === e.align ? m += a - f : "center" === e.align && (m -= f / 2); d && d.align({ y: e.y, width: A(b, this.initialButtonGroupWidth), align: e.align, x: m }, !0, c.spacingBox) }; m.prototype.positionButtons = function () {
                                        var a = this.buttons, b = this.chart, c = this.options, d = this.zoomText, e = b.hasLoaded ? "animate" : "attr", f = c.buttonPosition,
                                        m = b.plotLeft, g = m; d && "hidden" !== d.visibility && (d[e]({ x: A(m + f.x, m) }), g += f.x + d.getBBox().width + 5); this.buttonOptions.forEach(function (b, d) { if ("hidden" !== a[d].visibility) a[d][e]({ x: g }), g += a[d].width + c.buttonSpacing; else a[d][e]({ x: m }) })
                                    }; m.prototype.handleCollision = function (a) {
                                        var b = this, c = this.chart, d = this.buttonGroup, e = this.inputGroup, f = this.options, m = f.buttonPosition, g = f.dropdown, l = f.inputPosition; f = function () { var a = 0; b.buttons.forEach(function (b) { b = b.getBBox(); b.width > a && (a = b.width) }); return a }; var q =
                                            function (b) { if (e && d) { var c = e.alignAttr.translateX + e.alignOptions.x - a + e.getBBox().x + 2, f = e.alignOptions.width, g = d.alignAttr.translateX + d.getBBox().x; return g + b > c && c + f > g && m.y < l.y + e.getBBox().height } return !1 }, h = function () { e && d && e.attr({ translateX: e.alignAttr.translateX + (c.axisOffset[1] >= -a ? 0 : -a), translateY: e.alignAttr.translateY + d.getBBox().height + 10 }) }; if (d) { if ("always" === g) { this.collapseButtons(a); q(f()) && h(); return } "never" === g && this.expandButtons() } e && d ? l.align === m.align || q(this.initialButtonGroupWidth +
                                                20) ? "responsive" === g ? (this.collapseButtons(a), q(f()) && h()) : h() : "responsive" === g && this.expandButtons() : d && "responsive" === g && (this.initialButtonGroupWidth > c.plotWidth ? this.collapseButtons(a) : this.expandButtons())
                                    }; m.prototype.collapseButtons = function (a) {
                                        var b, c = this.buttons, d = this.buttonOptions, e = this.dropdown, f = this.options, m = this.zoomText, g = function (a) { return { text: a ? a + " \u25be" : "\u25be", width: "auto", paddingLeft: 8, paddingRight: 8 } }; m && m.hide(); var l = !1; d.forEach(function (a, b) {
                                            b = c[b]; 2 !== b.state ? b.hide() :
                                                (b.show(), b.attr(g(a.text)), l = !0)
                                        }); l || (e && (e.selectedIndex = 0), c[0].show(), c[0].attr(g(null === (b = this.zoomText) || void 0 === b ? void 0 : b.textStr))); b = f.buttonPosition.align; this.positionButtons(); "right" !== b && "center" !== b || this.alignButtonGroup(a, c[this.currentButtonIndex()].getBBox().width); this.showDropdown()
                                    }; m.prototype.expandButtons = function () {
                                        var a = this.buttons, b = this.buttonOptions, c = this.options, d = this.zoomText; this.hideDropdown(); d && d.show(); b.forEach(function (b, d) {
                                            d = a[d]; d.show(); d.attr({
                                                text: b.text,
                                                width: c.buttonTheme.width || 28, paddingLeft: "unset", paddingRight: "unset"
                                            }); 2 > d.state && d.setState(0)
                                        }); this.positionButtons()
                                    }; m.prototype.currentButtonIndex = function () { var a = this.dropdown; return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0 }; m.prototype.showDropdown = function () {
                                        var b = this.buttonGroup, c = this.buttons, d = this.chart, e = this.dropdown; if (b && e) {
                                            var f = b.translateX; b = b.translateY; c = c[this.currentButtonIndex()].getBBox(); a(e, { left: d.plotLeft + f + "px", top: b + .5 + "px", width: c.width + "px", height: c.height + "px" });
                                            this.hasVisibleDropdown = !0
                                        }
                                    }; m.prototype.hideDropdown = function () { var b = this.dropdown; b && (a(b, { top: "-9999em", width: "1px", height: "1px" }), this.hasVisibleDropdown = !1) }; m.prototype.getHeight = function () { var a = this.options, b = this.group, c = a.y, d = a.buttonPosition.y, e = a.inputPosition.y; if (a.height) return a.height; this.alignElements(); a = b ? b.getBBox(!0).height + 13 + c : 0; b = Math.min(e, d); if (0 > e && 0 > d || 0 < e && 0 < d) a += Math.abs(b); return a }; m.prototype.titleCollision = function (a) { return !(a.options.title.text || a.options.subtitle.text) };
                                    m.prototype.update = function (a) { var b = this.chart; w(!0, b.options.rangeSelector, a); this.destroy(); this.init(b); this.render() }; m.prototype.destroy = function () {
                                        var a = this, b = a.minInput, c = a.maxInput; a.eventsToUnbind && (a.eventsToUnbind.forEach(function (a) { return a() }), a.eventsToUnbind = void 0); d(a.buttons); b && (b.onfocus = b.onblur = b.onchange = null); c && (c.onfocus = c.onblur = c.onchange = null); F(a, function (b, c) {
                                            b && "chart" !== c && (b instanceof g ? b.destroy() : b instanceof window.HTMLElement && l(b)); b !== m.prototype[c] && (a[c] =
                                                null)
                                        }, this)
                                    }; return m
                                }(); v.prototype.defaultButtons = [{ type: "month", count: 1, text: "1m", title: "View 1 month" }, { type: "month", count: 3, text: "3m", title: "View 3 months" }, { type: "month", count: 6, text: "6m", title: "View 6 months" }, { type: "ytd", text: "YTD", title: "View year to date" }, { type: "year", count: 1, text: "1y", title: "View 1 year" }, { type: "all", text: "All", title: "View all" }]; v.prototype.inputTypeFormats = { "datetime-local": "%Y-%m-%dT%H:%M:%S", date: "%Y-%m-%d", time: "%H:%M:%S" }; b.prototype.minFromRange = function () {
                                    var a =
                                        this.range, b = a.type, c = this.max, d = this.chart.time, e = function (a, c) { var e = "year" === b ? "FullYear" : "Month", f = new d.Date(a), m = d.get(e, f); d.set(e, f, m + c); m === d.get(e, f) && d.set("Date", f, 0); return f.getTime() - a }; if (x(a)) { var f = c - a; var g = a } else f = c + e(c, -a.count), this.chart && (this.chart.fixedRange = c - f); var l = A(this.dataMin, Number.MIN_VALUE); x(f) || (f = l); f <= l && (f = l, "undefined" === typeof g && (g = e(f, a.count)), this.newMax = Math.min(f + g, this.dataMax)); x(c) || (f = void 0); return f
                                }; if (!n.RangeSelector) {
                                    var D = [], K = function (a) {
                                        function b() {
                                            d &&
                                            (c = a.xAxis[0].getExtremes(), e = a.legend, m = null === d || void 0 === d ? void 0 : d.options.verticalAlign, x(c.min) && d.render(c.min, c.max), e.display && "top" === m && m === e.options.verticalAlign && (g = w(a.spacingBox), g.y = "vertical" === e.options.layout ? a.plotTop : g.y + d.getHeight(), e.group.placed = !1, e.align(g)))
                                        } var c, d = a.rangeSelector, e, g, m; d && (G(D, function (b) { return b[0] === a }) || D.push([a, [f(a.xAxis[0], "afterSetExtremes", function (a) { d && d.render(a.min, a.max) }), f(a, "redraw", b)]]), b())
                                    }; f(k, "afterGetContainer", function () {
                                        var a;
                                        if (null === (a = this.options.rangeSelector) || void 0 === a ? 0 : a.enabled) this.rangeSelector = new v(this)
                                    }); f(k, "beforeRender", function () { var a = this.axes, b = this.rangeSelector; b && (x(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick), a.forEach(function (a) { a.updateNames(); a.setScale() }), this.getAxisMargins(), b.render(), a = b.options.verticalAlign, b.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))) }); f(k, "update", function (a) {
                                        var b = a.options.rangeSelector;
                                        a = this.rangeSelector; var d = this.extraBottomMargin, e = this.extraTopMargin; b && b.enabled && !c(a) && this.options.rangeSelector && (this.options.rangeSelector.enabled = !0, this.rangeSelector = a = new v(this)); this.extraTopMargin = this.extraBottomMargin = !1; a && (K(this), b = b && b.verticalAlign || a.options && a.options.verticalAlign, a.options.floating || ("bottom" === b ? this.extraBottomMargin = !0 : "middle" !== b && (this.extraTopMargin = !0)), this.extraBottomMargin !== d || this.extraTopMargin !== e) && (this.isDirtyBox = !0)
                                    }); f(k, "render", function () {
                                        var a =
                                            this.rangeSelector; a && !a.options.floating && (a.render(), a = a.options.verticalAlign, "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))
                                    }); f(k, "getMargins", function () { var a = this.rangeSelector; a && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a)) }); k.prototype.callbacks.push(K); f(k, "destroy", function () { for (var a = 0; a < D.length; a++) { var b = D[a]; if (b[0] === this) { b[1].forEach(function (a) { return a() }); D.splice(a, 1); break } } }); n.RangeSelector =
                                        v
                                } return n.RangeSelector
                        }); w(b, "Accessibility/Components/RangeSelectorComponent.js", [b["Accessibility/AccessibilityComponent.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/Announcer.js"], b["Core/Globals.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Core/Utilities.js"], b["Extensions/RangeSelector.js"]], function (b, k, n, p, t, g, h, u) {
                            var r = k.unhideChartElementFromAT, f = k.getAxisRangeDescription, e = t.setElAttrs, a = h.addEvent; k = h.extend;
                            p.Chart.prototype.highlightRangeSelectorButton = function (a) { var b, c, e = (null === (b = this.rangeSelector) || void 0 === b ? void 0 : b.buttons) || []; b = this.highlightedRangeSelectorItemIx; var f = null === (c = this.rangeSelector) || void 0 === c ? void 0 : c.selected; "undefined" !== typeof b && e[b] && b !== f && e[b].setState(this.oldRangeSelectorItemState || 0); this.highlightedRangeSelectorItemIx = a; return e[a] ? (this.setFocusToElement(e[a].box, e[a].element), a !== f && (this.oldRangeSelectorItemState = e[a].state, e[a].setState(1)), !0) : !1 }; a(u,
                                "afterBtnClick", function () { var a, b = null === (a = this.chart.accessibility) || void 0 === a ? void 0 : a.components.rangeSelector; return null === b || void 0 === b ? void 0 : b.onAfterBtnClick() }); p = function () { }; p.prototype = new b; k(p.prototype, {
                                    init: function () { this.announcer = new n(this.chart, "polite") }, onChartUpdate: function () {
                                        var a, b = this.chart, e = this, f = b.rangeSelector; f && (this.updateSelectorVisibility(), this.setDropdownAttrs(), (null === (a = f.buttons) || void 0 === a ? 0 : a.length) && f.buttons.forEach(function (a) { e.setRangeButtonAttrs(a) }),
                                            f.maxInput && f.minInput && ["minInput", "maxInput"].forEach(function (a, c) { if (a = f[a]) r(b, a), e.setRangeInputAttrs(a, "accessibility.rangeSelector." + (c ? "max" : "min") + "InputLabel") }))
                                    }, updateSelectorVisibility: function () {
                                        var a = this.chart, b = a.rangeSelector, e = null === b || void 0 === b ? void 0 : b.dropdown, f = (null === b || void 0 === b ? void 0 : b.buttons) || []; (null === b || void 0 === b ? 0 : b.hasVisibleDropdown) && e ? (r(a, e), f.forEach(function (a) { return a.element.setAttribute("aria-hidden", !0) })) : (e && e.setAttribute("aria-hidden", !0), f.forEach(function (b) {
                                            return r(a,
                                                b.element)
                                        }))
                                    }, setDropdownAttrs: function () { var a, b = this.chart, e = null === (a = b.rangeSelector) || void 0 === a ? void 0 : a.dropdown; e && (a = b.langFormat("accessibility.rangeSelector.dropdownLabel", { rangeTitle: b.options.lang.rangeSelectorZoom }), e.setAttribute("aria-label", a), e.setAttribute("tabindex", -1)) }, setRangeButtonAttrs: function (a) { e(a.element, { tabindex: -1, role: "button" }) }, setRangeInputAttrs: function (a, b) { var c = this.chart; e(a, { tabindex: -1, "aria-label": c.langFormat(b, { chart: c }) }) }, onButtonNavKbdArrowKey: function (a,
                                        b) { var c = a.response, d = this.keyCodes, e = this.chart, f = e.options.accessibility.keyboardNavigation.wrapAround; b = b === d.left || b === d.up ? -1 : 1; return e.highlightRangeSelectorButton(e.highlightedRangeSelectorItemIx + b) ? c.success : f ? (a.init(b), c.success) : c[0 < b ? "next" : "prev"] }, onButtonNavKbdClick: function (a) { a = a.response; var b = this.chart; 3 !== b.oldRangeSelectorItemState && this.fakeClickEvent(b.rangeSelector.buttons[b.highlightedRangeSelectorItemIx].element); return a.success }, onAfterBtnClick: function () {
                                            var a = this.chart,
                                            b = f(a.xAxis[0]); (a = a.langFormat("accessibility.rangeSelector.clickButtonAnnouncement", { chart: a, axisRangeDescription: b })) && this.announcer.announce(a)
                                        }, onInputKbdMove: function (a) {
                                            var b, c, e = this.chart, f = e.rangeSelector, g = e.highlightedInputRangeIx = (e.highlightedInputRangeIx || 0) + a; 1 < g || 0 > g ? (null === (b = e.accessibility) || void 0 === b ? void 0 : b.keyboardNavigation.tabindexContainer.focus(), null === (c = e.accessibility) || void 0 === c ? void 0 : c.keyboardNavigation[0 > a ? "prev" : "next"]()) : f && (a = f[g ? "maxDateBox" : "minDateBox"],
                                                f = f[g ? "maxInput" : "minInput"], a && f && e.setFocusToElement(a, f))
                                        }, onInputNavInit: function (b) {
                                            var c = this, e = this, f = this.chart, g = 0 < b ? 0 : 1, h = f.rangeSelector, k = null === h || void 0 === h ? void 0 : h[g ? "maxDateBox" : "minDateBox"]; b = null === h || void 0 === h ? void 0 : h.minInput; h = null === h || void 0 === h ? void 0 : h.maxInput; f.highlightedInputRangeIx = g; if (k && b && h) {
                                                f.setFocusToElement(k, g ? h : b); this.removeInputKeydownHandler && this.removeInputKeydownHandler(); f = function (a) {
                                                    (a.which || a.keyCode) === c.keyCodes.tab && (a.preventDefault(), a.stopPropagation(),
                                                        e.onInputKbdMove(a.shiftKey ? -1 : 1))
                                                }; var r = a(b, "keydown", f), t = a(h, "keydown", f); this.removeInputKeydownHandler = function () { r(); t() }
                                            }
                                        }, onInputNavTerminate: function () { var a = this.chart.rangeSelector || {}; a.maxInput && a.hideInput("max"); a.minInput && a.hideInput("min"); this.removeInputKeydownHandler && (this.removeInputKeydownHandler(), delete this.removeInputKeydownHandler) }, initDropdownNav: function () {
                                            var b = this, d = this.chart, e = d.rangeSelector, f = null === e || void 0 === e ? void 0 : e.dropdown; e && f && (d.setFocusToElement(e.buttonGroup,
                                                f), this.removeDropdownKeydownHandler && this.removeDropdownKeydownHandler(), this.removeDropdownKeydownHandler = a(f, "keydown", function (a) { var c, e; (a.which || a.keyCode) === b.keyCodes.tab && (a.preventDefault(), a.stopPropagation(), null === (c = d.accessibility) || void 0 === c ? void 0 : c.keyboardNavigation.tabindexContainer.focus(), null === (e = d.accessibility) || void 0 === e ? void 0 : e.keyboardNavigation[a.shiftKey ? "prev" : "next"]()) }))
                                        }, getRangeSelectorButtonNavigation: function () {
                                            var a = this.chart, b = this.keyCodes, e = this; return new g(a,
                                                {
                                                    keyCodeMap: [[[b.left, b.right, b.up, b.down], function (a) { return e.onButtonNavKbdArrowKey(this, a) }], [[b.enter, b.space], function () { return e.onButtonNavKbdClick(this) }]], validate: function () { var b, c; return !(null === (c = null === (b = a.rangeSelector) || void 0 === b ? void 0 : b.buttons) || void 0 === c || !c.length) }, init: function (b) { var c = a.rangeSelector; (null === c || void 0 === c ? 0 : c.hasVisibleDropdown) ? e.initDropdownNav() : c && (c = c.buttons.length - 1, a.highlightRangeSelectorButton(0 < b ? 0 : c)) }, terminate: function () {
                                                        e.removeDropdownKeydownHandler &&
                                                        (e.removeDropdownKeydownHandler(), delete e.removeDropdownKeydownHandler)
                                                    }
                                                })
                                        }, getRangeSelectorInputNavigation: function () { var a = this.chart, b = this; return new g(a, { keyCodeMap: [], validate: function () { return !!(a.rangeSelector && a.rangeSelector.inputGroup && "hidden" !== a.rangeSelector.inputGroup.element.getAttribute("visibility") && !1 !== a.options.rangeSelector.inputEnabled && a.rangeSelector.minInput && a.rangeSelector.maxInput) }, init: function (a) { b.onInputNavInit(a) }, terminate: function () { b.onInputNavTerminate() } }) },
                                    getKeyboardNavigation: function () { return [this.getRangeSelectorButtonNavigation(), this.getRangeSelectorInputNavigation()] }, destroy: function () { var a; this.removeDropdownKeydownHandler && this.removeDropdownKeydownHandler(); this.removeInputKeydownHandler && this.removeInputKeydownHandler(); null === (a = this.announcer) || void 0 === a ? void 0 : a.destroy() }
                                }); return p
                        }); w(b, "Accessibility/Components/InfoRegionsComponent.js", [b["Core/Globals.js"], b["Core/Renderer/HTML/AST.js"], b["Core/Utilities.js"], b["Accessibility/AccessibilityComponent.js"],
                        b["Accessibility/Utils/Announcer.js"], b["Accessibility/Components/AnnotationsA11y.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Accessibility/Utils/HTMLUtilities.js"]], function (b, k, n, p, t, g, h, u) {
                            var r = b.doc, f = n.extend, e = n.format, a = n.pick, c = g.getAnnotationsInfoHTML, d = h.getAxisDescription, l = h.getAxisRangeDescription, y = h.getChartTitle, x = h.unhideChartElementFromAT, w = u.addClass, M = u.getElement, N = u.getHeadingTagNameForElement, F = u.setElAttrs, H = u.stripHTMLTagsFromString, A = u.visuallyHideElement; b.Chart.prototype.getTypeDescription =
                                function (a) {
                                    var b = a[0], c = this.series && this.series[0] || {}; c = { numSeries: this.series.length, numPoints: c.points && c.points.length, chart: this, mapTitle: c.mapTitle }; if (!b) return this.langFormat("accessibility.chartTypes.emptyChart", c); if ("map" === b) return c.mapTitle ? this.langFormat("accessibility.chartTypes.mapTypeDescription", c) : this.langFormat("accessibility.chartTypes.unknownMap", c); if (1 < this.types.length) return this.langFormat("accessibility.chartTypes.combinationChart", c); a = a[0]; b = this.langFormat("accessibility.seriesTypeDescriptions." +
                                        a, c); var d = this.series && 2 > this.series.length ? "Single" : "Multiple"; return (this.langFormat("accessibility.chartTypes." + a + d, c) || this.langFormat("accessibility.chartTypes.default" + d, c)) + (b ? " " + b : "")
                                }; n = function () { }; n.prototype = new p; f(n.prototype, {
                                    init: function () {
                                        var a = this.chart, b = this; this.initRegionsDefinitions(); this.addEvent(a, "aftergetTableAST", function (a) { b.onDataTableCreated(a) }); this.addEvent(a, "afterViewData", function (a) { b.dataTableDiv = a; setTimeout(function () { b.focusDataTable() }, 300) }); this.announcer =
                                            new t(a, "assertive")
                                    }, initRegionsDefinitions: function () {
                                        var a = this; this.screenReaderSections = {
                                            before: { element: null, buildContent: function (b) { var c = b.options.accessibility.screenReaderSection.beforeChartFormatter; return c ? c(b) : a.defaultBeforeChartFormatter(b) }, insertIntoDOM: function (a, b) { b.renderTo.insertBefore(a, b.renderTo.firstChild) }, afterInserted: function () { "undefined" !== typeof a.sonifyButtonId && a.initSonifyButton(a.sonifyButtonId); "undefined" !== typeof a.dataTableButtonId && a.initDataTableButton(a.dataTableButtonId) } },
                                            after: { element: null, buildContent: function (b) { var c = b.options.accessibility.screenReaderSection.afterChartFormatter; return c ? c(b) : a.defaultAfterChartFormatter() }, insertIntoDOM: function (a, b) { b.renderTo.insertBefore(a, b.container.nextSibling) } }
                                        }
                                    }, onChartRender: function () { var a = this; this.linkedDescriptionElement = this.getLinkedDescriptionElement(); this.setLinkedDescriptionAttrs(); Object.keys(this.screenReaderSections).forEach(function (b) { a.updateScreenReaderSection(b) }) }, getLinkedDescriptionElement: function () {
                                        var a =
                                            this.chart.options.accessibility.linkedDescription; if (a) { if ("string" !== typeof a) return a; a = e(a, this.chart); a = r.querySelectorAll(a); if (1 === a.length) return a[0] }
                                    }, setLinkedDescriptionAttrs: function () { var a = this.linkedDescriptionElement; a && (a.setAttribute("aria-hidden", "true"), w(a, "highcharts-linked-description")) }, updateScreenReaderSection: function (a) {
                                        var b = this.chart, c = this.screenReaderSections[a], d = c.buildContent(b), e = c.element = c.element || this.createElement("div"), f = e.firstChild || this.createElement("div");
                                        this.setScreenReaderSectionAttribs(e, a); k.setElementHTML(f, d); e.appendChild(f); c.insertIntoDOM(e, b); A(f); x(b, f); c.afterInserted && c.afterInserted()
                                    }, setScreenReaderSectionAttribs: function (a, b) { var c = this.chart, d = c.langFormat("accessibility.screenReaderSection." + b + "RegionLabel", { chart: c }); F(a, { id: "highcharts-screen-reader-region-" + b + "-" + c.index, "aria-label": d }); a.style.position = "relative"; "all" === c.options.accessibility.landmarkVerbosity && d && a.setAttribute("role", "region") }, defaultBeforeChartFormatter: function () {
                                        var a,
                                        d = this.chart, e = d.options.accessibility.screenReaderSection.beforeChartFormat, f = this.getAxesDescription(), g = d.sonify && (null === (a = d.options.sonification) || void 0 === a ? void 0 : a.enabled); a = "highcharts-a11y-sonify-data-btn-" + d.index; var m = "hc-linkto-highcharts-data-table-" + d.index, h = c(d), l = d.langFormat("accessibility.screenReaderSection.annotations.heading", { chart: d }); f = {
                                            headingTagName: N(d.renderTo), chartTitle: y(d), typeDescription: this.getTypeDescriptionText(), chartSubtitle: this.getSubtitleText(), chartLongdesc: this.getLongdescText(),
                                            xAxisDescription: f.xAxis, yAxisDescription: f.yAxis, playAsSoundButton: g ? this.getSonifyButtonText(a) : "", viewTableButton: d.getCSV ? this.getDataTableButtonText(m) : "", annotationsTitle: h ? l : "", annotationsList: h
                                        }; d = b.i18nFormat(e, f, d); this.dataTableButtonId = m; this.sonifyButtonId = a; return d.replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "")
                                    }, defaultAfterChartFormatter: function () {
                                        var a = this.chart, c = a.options.accessibility.screenReaderSection.afterChartFormat, d = { endOfChartMarker: this.getEndOfChartMarkerText() }; return b.i18nFormat(c,
                                            d, a).replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "")
                                    }, getLinkedDescription: function () { var a = this.linkedDescriptionElement; return H(a && a.innerHTML || "") }, getLongdescText: function () { var a = this.chart.options, b = a.caption; b = b && b.text; var c = this.getLinkedDescription(); return a.accessibility.description || c || b || "" }, getTypeDescriptionText: function () { var a = this.chart; return a.types ? a.options.accessibility.typeDescription || a.getTypeDescription(a.types) : "" }, getDataTableButtonText: function (a) {
                                        var b = this.chart; b = b.langFormat("accessibility.table.viewAsDataTableButtonText",
                                            { chart: b, chartTitle: y(b) }); return '<button id="' + a + '">' + b + "</button>"
                                    }, getSonifyButtonText: function (a) { var b, c = this.chart; if (!1 === (null === (b = c.options.sonification) || void 0 === b ? void 0 : b.enabled)) return ""; b = c.langFormat("accessibility.sonification.playAsSoundButtonText", { chart: c, chartTitle: y(c) }); return '<button id="' + a + '">' + b + "</button>" }, getSubtitleText: function () { var a = this.chart.options.subtitle; return H(a && a.text || "") }, getEndOfChartMarkerText: function () {
                                        var a = this.chart, b = a.langFormat("accessibility.screenReaderSection.endOfChartMarker",
                                            { chart: a }); return '<div id="highcharts-end-of-chart-marker-' + a.index + '">' + b + "</div>"
                                    }, onDataTableCreated: function (a) { var b = this.chart; if (b.options.accessibility.enabled) { this.viewDataTableButton && this.viewDataTableButton.setAttribute("aria-expanded", "true"); var c = a.tree.attributes || {}; c.tabindex = -1; c.summary = b.langFormat("accessibility.table.tableSummary", { chart: b }); a.tree.attributes = c } }, focusDataTable: function () { var a = this.dataTableDiv; (a = a && a.getElementsByTagName("table")[0]) && a.focus && a.focus() },
                                    initSonifyButton: function (a) {
                                        var b = this, c = this.sonifyButton = M(a), d = this.chart, e = function (a) {
                                            null === c || void 0 === c ? void 0 : c.setAttribute("aria-hidden", "true"); null === c || void 0 === c ? void 0 : c.setAttribute("aria-label", ""); a.preventDefault(); a.stopPropagation(); a = d.langFormat("accessibility.sonification.playAsSoundClickAnnouncement", { chart: d }); b.announcer.announce(a); setTimeout(function () {
                                                null === c || void 0 === c ? void 0 : c.removeAttribute("aria-hidden"); null === c || void 0 === c ? void 0 : c.removeAttribute("aria-label");
                                                d.sonify && d.sonify()
                                            }, 1E3)
                                        }; c && d && (F(c, { tabindex: "-1" }), c.onclick = function (a) { var b; ((null === (b = d.options.accessibility) || void 0 === b ? void 0 : b.screenReaderSection.onPlayAsSoundClick) || e).call(this, a, d) })
                                    }, initDataTableButton: function (a) { var b = this.viewDataTableButton = M(a), c = this.chart; a = a.replace("hc-linkto-", ""); b && (F(b, { tabindex: "-1", "aria-expanded": !!M(a) }), b.onclick = c.options.accessibility.screenReaderSection.onViewDataTableClick || function () { c.viewData() }) }, getAxesDescription: function () {
                                        var b =
                                            this.chart, c = function (c, d) { c = b[c]; return 1 < c.length || c[0] && a(c[0].options.accessibility && c[0].options.accessibility.enabled, d) }, d = !!b.types && 0 > b.types.indexOf("map"), e = !!b.hasCartesianSeries, f = c("xAxis", !b.angular && e && d); c = c("yAxis", e && d); d = {}; f && (d.xAxis = this.getAxisDescriptionText("xAxis")); c && (d.yAxis = this.getAxisDescriptionText("yAxis")); return d
                                    }, getAxisDescriptionText: function (a) {
                                        var b = this.chart, c = b[a]; return b.langFormat("accessibility.axis." + a + "Description" + (1 < c.length ? "Plural" : "Singular"),
                                            { chart: b, names: c.map(function (a) { return d(a) }), ranges: c.map(function (a) { return l(a) }), numAxes: c.length })
                                    }, destroy: function () { var a; null === (a = this.announcer) || void 0 === a ? void 0 : a.destroy() }
                                }); return n
                        }); w(b, "Accessibility/Components/ContainerComponent.js", [b["Accessibility/AccessibilityComponent.js"], b["Accessibility/Utils/ChartUtilities.js"], b["Core/Globals.js"], b["Accessibility/Utils/HTMLUtilities.js"], b["Core/Utilities.js"]], function (b, k, n, p, t) {
                            var g = k.unhideChartElementFromAT, h = k.getChartTitle,
                            u = n.doc, r = p.stripHTMLTagsFromString; k = t.extend; n = function () { }; n.prototype = new b; k(n.prototype, {
                                onChartUpdate: function () { this.handleSVGTitleElement(); this.setSVGContainerLabel(); this.setGraphicContainerAttrs(); this.setRenderToAttrs(); this.makeCreditsAccessible() }, handleSVGTitleElement: function () {
                                    var b = this.chart, e = "highcharts-title-" + b.index, a = r(b.langFormat("accessibility.svgContainerTitle", { chartTitle: h(b) })); if (a.length) {
                                        var c = this.svgTitleElement = this.svgTitleElement || u.createElementNS("http://www.w3.org/2000/svg",
                                            "title"); c.textContent = a; c.id = e; b.renderTo.insertBefore(c, b.renderTo.firstChild)
                                    }
                                }, setSVGContainerLabel: function () { var b = this.chart, e = b.langFormat("accessibility.svgContainerLabel", { chartTitle: h(b) }); b.renderer.box && e.length && b.renderer.box.setAttribute("aria-label", e) }, setGraphicContainerAttrs: function () { var b = this.chart, e = b.langFormat("accessibility.graphicContainerLabel", { chartTitle: h(b) }); e.length && b.container.setAttribute("aria-label", e) }, setRenderToAttrs: function () {
                                    var b = this.chart; "disabled" !==
                                        b.options.accessibility.landmarkVerbosity ? b.renderTo.setAttribute("role", "region") : b.renderTo.removeAttribute("role"); b.renderTo.setAttribute("aria-label", b.langFormat("accessibility.chartContainerLabel", { title: h(b), chart: b }))
                                }, makeCreditsAccessible: function () { var b = this.chart, e = b.credits; e && (e.textStr && e.element.setAttribute("aria-label", b.langFormat("accessibility.credits", { creditsStr: r(e.textStr) })), g(b, e.element)) }, destroy: function () { this.chart.renderTo.setAttribute("aria-hidden", !0) }
                            }); return n
                        });
    w(b, "Accessibility/HighContrastMode.js", [b["Core/Globals.js"]], function (b) {
        var k = b.doc, n = b.isMS, p = b.win; return {
            isHighContrastModeActive: function () {
                var b = /(Edg)/.test(p.navigator.userAgent); if (p.matchMedia && b) return p.matchMedia("(-ms-high-contrast: active)").matches; if (n && p.getComputedStyle) {
                    b = k.createElement("div"); b.style.backgroundImage = "url(data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==)"; k.body.appendChild(b); var g = (b.currentStyle || p.getComputedStyle(b)).backgroundImage;
                    k.body.removeChild(b); return "none" === g
                } return !1
            }, setHighContrastTheme: function (b) { b.highContrastModeActive = !0; var g = b.options.accessibility.highContrastTheme; b.update(g, !1); b.series.forEach(function (b) { var h = g.plotOptions[b.type] || {}; b.update({ color: h.color || "windowText", colors: [h.color || "windowText"], borderColor: h.borderColor || "window" }); b.points.forEach(function (b) { b.options && b.options.color && b.update({ color: h.color || "windowText", borderColor: h.borderColor || "window" }, !1) }) }); b.redraw() }
        }
    }); w(b, "Accessibility/HighContrastTheme.js",
        [], function () {
            return {
                chart: { backgroundColor: "window" }, title: { style: { color: "windowText" } }, subtitle: { style: { color: "windowText" } }, colorAxis: { minColor: "windowText", maxColor: "windowText", stops: [] }, colors: ["windowText"], xAxis: { gridLineColor: "windowText", labels: { style: { color: "windowText" } }, lineColor: "windowText", minorGridLineColor: "windowText", tickColor: "windowText", title: { style: { color: "windowText" } } }, yAxis: {
                    gridLineColor: "windowText", labels: { style: { color: "windowText" } }, lineColor: "windowText", minorGridLineColor: "windowText",
                    tickColor: "windowText", title: { style: { color: "windowText" } }
                }, tooltip: { backgroundColor: "window", borderColor: "windowText", style: { color: "windowText" } }, plotOptions: {
                    series: { lineColor: "windowText", fillColor: "window", borderColor: "windowText", edgeColor: "windowText", borderWidth: 1, dataLabels: { connectorColor: "windowText", color: "windowText", style: { color: "windowText", textOutline: "none" } }, marker: { lineColor: "windowText", fillColor: "windowText" } }, pie: { color: "window", colors: ["window"], borderColor: "windowText", borderWidth: 1 },
                    boxplot: { fillColor: "window" }, candlestick: { lineColor: "windowText", fillColor: "window" }, errorbar: { fillColor: "window" }
                }, legend: { backgroundColor: "window", itemStyle: { color: "windowText" }, itemHoverStyle: { color: "windowText" }, itemHiddenStyle: { color: "#555" }, title: { style: { color: "windowText" } } }, credits: { style: { color: "windowText" } }, labels: { style: { color: "windowText" } }, drilldown: { activeAxisLabelStyle: { color: "windowText" }, activeDataLabelStyle: { color: "windowText" } }, navigation: {
                    buttonOptions: {
                        symbolStroke: "windowText",
                        theme: { fill: "window" }
                    }
                }, rangeSelector: { buttonTheme: { fill: "window", stroke: "windowText", style: { color: "windowText" }, states: { hover: { fill: "window", stroke: "windowText", style: { color: "windowText" } }, select: { fill: "#444", stroke: "windowText", style: { color: "windowText" } } } }, inputBoxBorderColor: "windowText", inputStyle: { backgroundColor: "window", color: "windowText" }, labelStyle: { color: "windowText" } }, navigator: {
                    handles: { backgroundColor: "window", borderColor: "windowText" }, outlineColor: "windowText", maskFill: "transparent",
                    series: { color: "windowText", lineColor: "windowText" }, xAxis: { gridLineColor: "windowText" }
                }, scrollbar: { barBackgroundColor: "#444", barBorderColor: "windowText", buttonArrowColor: "windowText", buttonBackgroundColor: "window", buttonBorderColor: "windowText", rifleColor: "windowText", trackBackgroundColor: "window", trackBorderColor: "windowText" }
            }
        }); w(b, "Accessibility/Options/Options.js", [b["Core/Color/Palette.js"]], function (b) {
            return {
                accessibility: {
                    enabled: !0, screenReaderSection: {
                        beforeChartFormat: "<{headingTagName}>{chartTitle}</{headingTagName}><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{playAsSoundButton}</div><div>{viewTableButton}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div><div>{annotationsTitle}{annotationsList}</div>",
                        afterChartFormat: "{endOfChartMarker}", axisRangeDateFormat: "%Y-%m-%d %H:%M:%S"
                    }, series: { describeSingleSeries: !1, pointDescriptionEnabledThreshold: 200 }, point: { valueDescriptionFormat: "{index}. {xDescription}{separator}{value}." }, landmarkVerbosity: "all", linkedDescription: '*[data-highcharts-chart="{index}"] + .highcharts-description', keyboardNavigation: {
                        enabled: !0, focusBorder: { enabled: !0, hideBrowserFocusOutline: !0, style: { color: b.highlightColor80, lineWidth: 2, borderRadius: 3 }, margin: 2 }, order: ["series", "zoom",
                            "rangeSelector", "legend", "chartMenu"], wrapAround: !0, seriesNavigation: { skipNullPoints: !0, pointNavigationEnabledThreshold: !1 }
                    }, announceNewData: { enabled: !1, minAnnounceInterval: 5E3, interruptUser: !1 }
                }, legend: { accessibility: { enabled: !0, keyboardNavigation: { enabled: !0 } } }, exporting: { accessibility: { enabled: !0 } }
            }
        }); w(b, "Accessibility/Options/LangOptions.js", [], function () {
            return {
                accessibility: {
                    defaultChartTitle: "Chart", chartContainerLabel: "{title}. Highcharts interactive chart.", svgContainerLabel: "Interactive chart",
                    drillUpButton: "{buttonText}", credits: "Chart credits: {creditsStr}", thousandsSep: ",", svgContainerTitle: "", graphicContainerLabel: "", screenReaderSection: {
                        beforeRegionLabel: "Chart screen reader information.", afterRegionLabel: "", annotations: { heading: "Chart annotations summary", descriptionSinglePoint: "{annotationText}. Related to {annotationPoint}", descriptionMultiplePoints: "{annotationText}. Related to {annotationPoint}{ Also related to, #each(additionalAnnotationPoints)}", descriptionNoPoints: "{annotationText}" },
                        endOfChartMarker: "End of interactive chart."
                    }, sonification: { playAsSoundButtonText: "Play as sound, {chartTitle}", playAsSoundClickAnnouncement: "Play" }, legend: { legendLabelNoTitle: "Toggle series visibility", legendLabel: "Chart legend: {legendTitle}", legendItem: "Show {itemName}" }, zoom: { mapZoomIn: "Zoom chart", mapZoomOut: "Zoom out chart", resetZoomButton: "Reset zoom" }, rangeSelector: { dropdownLabel: "{rangeTitle}", minInputLabel: "Select start date.", maxInputLabel: "Select end date.", clickButtonAnnouncement: "Viewing {axisRangeDescription}" },
                    table: { viewAsDataTableButtonText: "View as data table, {chartTitle}", tableSummary: "Table representation of chart." }, announceNewData: { newDataAnnounce: "Updated data for chart {chartTitle}", newSeriesAnnounceSingle: "New data series: {seriesDesc}", newPointAnnounceSingle: "New data point: {pointDesc}", newSeriesAnnounceMultiple: "New data series in chart {chartTitle}: {seriesDesc}", newPointAnnounceMultiple: "New data point in chart {chartTitle}: {pointDesc}" }, seriesTypeDescriptions: {
                        boxplot: "Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.",
                        arearange: "Arearange charts are line charts displaying a range between a lower and higher value for each point.", areasplinerange: "These charts are line charts displaying a range between a lower and higher value for each point.", bubble: "Bubble charts are scatter charts where each data point also has a size value.", columnrange: "Columnrange charts are column charts displaying a range between a lower and higher value for each point.", errorbar: "Errorbar series are used to display the variability of the data.",
                        funnel: "Funnel charts are used to display reduction of data in stages.", pyramid: "Pyramid charts consist of a single pyramid with item heights corresponding to each point value.", waterfall: "A waterfall chart is a column chart where each column contributes towards a total end value."
                    }, chartTypes: {
                        emptyChart: "Empty chart", mapTypeDescription: "Map of {mapTitle} with {numSeries} data series.", unknownMap: "Map of unspecified region with {numSeries} data series.", combinationChart: "Combination chart with {numSeries} data series.",
                        defaultSingle: "Chart with {numPoints} data {#plural(numPoints, points, point)}.", defaultMultiple: "Chart with {numSeries} data series.", splineSingle: "Line chart with {numPoints} data {#plural(numPoints, points, point)}.", splineMultiple: "Line chart with {numSeries} lines.", lineSingle: "Line chart with {numPoints} data {#plural(numPoints, points, point)}.", lineMultiple: "Line chart with {numSeries} lines.", columnSingle: "Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.", columnMultiple: "Bar chart with {numSeries} data series.",
                        barSingle: "Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.", barMultiple: "Bar chart with {numSeries} data series.", pieSingle: "Pie chart with {numPoints} {#plural(numPoints, slices, slice)}.", pieMultiple: "Pie chart with {numSeries} pies.", scatterSingle: "Scatter chart with {numPoints} {#plural(numPoints, points, point)}.", scatterMultiple: "Scatter chart with {numSeries} data series.", boxplotSingle: "Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.", boxplotMultiple: "Boxplot with {numSeries} data series.",
                        bubbleSingle: "Bubble chart with {numPoints} {#plural(numPoints, bubbles, bubble)}.", bubbleMultiple: "Bubble chart with {numSeries} data series."
                    }, axis: {
                        xAxisDescriptionSingular: "The chart has 1 X axis displaying {names[0]}. {ranges[0]}", xAxisDescriptionPlural: "The chart has {numAxes} X axes displaying {#each(names, -1) }and {names[-1]}.", yAxisDescriptionSingular: "The chart has 1 Y axis displaying {names[0]}. {ranges[0]}", yAxisDescriptionPlural: "The chart has {numAxes} Y axes displaying {#each(names, -1) }and {names[-1]}.",
                        timeRangeDays: "Range: {range} days.", timeRangeHours: "Range: {range} hours.", timeRangeMinutes: "Range: {range} minutes.", timeRangeSeconds: "Range: {range} seconds.", rangeFromTo: "Range: {rangeFrom} to {rangeTo}.", rangeCategories: "Range: {numCategories} categories."
                    }, exporting: { chartMenuLabel: "Chart menu", menuButtonLabel: "View chart menu", exportRegionLabel: "Chart menu" }, series: {
                        summary: {
                            "default": "{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", defaultCombination: "{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",
                            line: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", lineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.", spline: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", splineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.", column: "{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.",
                            columnCombination: "{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.", bar: "{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.", barCombination: "{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.", pie: "{name}, pie {ix} of {numSeries} with {numPoints} {#plural(numPoints, slices, slice)}.", pieCombination: "{name}, series {ix} of {numSeries}. Pie with {numPoints} {#plural(numPoints, slices, slice)}.",
                            scatter: "{name}, scatter plot {ix} of {numSeries} with {numPoints} {#plural(numPoints, points, point)}.", scatterCombination: "{name}, series {ix} of {numSeries}, scatter plot with {numPoints} {#plural(numPoints, points, point)}.", boxplot: "{name}, boxplot {ix} of {numSeries} with {numPoints} {#plural(numPoints, boxes, box)}.", boxplotCombination: "{name}, series {ix} of {numSeries}. Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.", bubble: "{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                            bubbleCombination: "{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}.", map: "{name}, map {ix} of {numSeries} with {numPoints} {#plural(numPoints, areas, area)}.", mapCombination: "{name}, series {ix} of {numSeries}. Map with {numPoints} {#plural(numPoints, areas, area)}.", mapline: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", maplineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",
                            mapbubble: "{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.", mapbubbleCombination: "{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}."
                        }, description: "{description}", xAxisDescription: "X axis, {name}", yAxisDescription: "Y axis, {name}", nullPointValue: "No value", pointAnnotationsDescription: "{Annotation: #each(annotations). }"
                    }
                }
            }
        }); w(b, "Accessibility/Options/DeprecatedOptions.js", [b["Core/Utilities.js"]],
            function (b) {
                function k(b, f, e) { for (var a, c = 0; c < f.length - 1; ++c)a = f[c], b = b[a] = u(b[a], {}); b[f[f.length - 1]] = e } function n(b, f, e, a) { function c(a, b) { return b.reduce(function (a, b) { return a[b] }, a) } var d = c(b.options, f), g = c(b.options, e); Object.keys(a).forEach(function (c) { var l, r = d[c]; "undefined" !== typeof r && (k(g, a[c], r), h(32, !1, b, (l = {}, l[f.join(".") + "." + c] = e.join(".") + "." + a[c].join("."), l))) }) } function p(b) {
                    var f = b.options.chart || {}, e = b.options.accessibility || {};["description", "typeDescription"].forEach(function (a) {
                        var c;
                        f[a] && (e[a] = f[a], h(32, !1, b, (c = {}, c["chart." + a] = "use accessibility." + a, c)))
                    })
                } function t(b) { b.axes.forEach(function (f) { (f = f.options) && f.description && (f.accessibility = f.accessibility || {}, f.accessibility.description = f.description, h(32, !1, b, { "axis.description": "use axis.accessibility.description" })) }) } function g(b) {
                    var f = {
                        description: ["accessibility", "description"], exposeElementToA11y: ["accessibility", "exposeAsGroupOnly"], pointDescriptionFormatter: ["accessibility", "pointDescriptionFormatter"], skipKeyboardNavigation: ["accessibility",
                            "keyboardNavigation", "enabled"]
                    }; b.series.forEach(function (e) { Object.keys(f).forEach(function (a) { var c, d = e.options[a]; "undefined" !== typeof d && (k(e.options, f[a], "skipKeyboardNavigation" === a ? !d : d), h(32, !1, b, (c = {}, c["series." + a] = "series." + f[a].join("."), c))) }) })
                } var h = b.error, u = b.pick; return function (b) {
                    p(b); t(b); b.series && g(b); n(b, ["accessibility"], ["accessibility"], {
                        pointDateFormat: ["point", "dateFormat"], pointDateFormatter: ["point", "dateFormatter"], pointDescriptionFormatter: ["point", "descriptionFormatter"],
                        pointDescriptionThreshold: ["series", "pointDescriptionEnabledThreshold"], pointNavigationThreshold: ["keyboardNavigation", "seriesNavigation", "pointNavigationEnabledThreshold"], pointValueDecimals: ["point", "valueDecimals"], pointValuePrefix: ["point", "valuePrefix"], pointValueSuffix: ["point", "valueSuffix"], screenReaderSectionFormatter: ["screenReaderSection", "beforeChartFormatter"], describeSingleSeries: ["series", "describeSingleSeries"], seriesDescriptionFormatter: ["series", "descriptionFormatter"], onTableAnchorClick: ["screenReaderSection",
                            "onViewDataTableClick"], axisRangeDateFormat: ["screenReaderSection", "axisRangeDateFormat"]
                    }); n(b, ["accessibility", "keyboardNavigation"], ["accessibility", "keyboardNavigation", "seriesNavigation"], { skipNullPoints: ["skipNullPoints"], mode: ["mode"] }); n(b, ["lang", "accessibility"], ["lang", "accessibility"], {
                        legendItem: ["legend", "legendItem"], legendLabel: ["legend", "legendLabel"], mapZoomIn: ["zoom", "mapZoomIn"], mapZoomOut: ["zoom", "mapZoomOut"], resetZoomButton: ["zoom", "resetZoomButton"], screenReaderRegionLabel: ["screenReaderSection",
                            "beforeRegionLabel"], rangeSelectorButton: ["rangeSelector", "buttonText"], rangeSelectorMaxInput: ["rangeSelector", "maxInputLabel"], rangeSelectorMinInput: ["rangeSelector", "minInputLabel"], svgContainerEnd: ["screenReaderSection", "endOfChartMarker"], viewAsDataTable: ["table", "viewAsDataTableButtonText"], tableSummary: ["table", "tableSummary"]
                    })
                }
            }); w(b, "Accessibility/A11yI18n.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function (b, k) {
                function n(b, h) {
                    var g = b.indexOf("#each("), k = b.indexOf("#plural("), f = b.indexOf("["),
                    e = b.indexOf("]"); if (-1 < g) { f = b.slice(g).indexOf(")") + g; var a = b.substring(0, g); k = b.substring(f + 1); f = b.substring(g + 6, f).split(","); g = Number(f[1]); b = ""; if (h = h[f[0]]) for (g = isNaN(g) ? h.length : g, g = 0 > g ? h.length + g : Math.min(g, h.length), f = 0; f < g; ++f)b += a + h[f] + k; return b.length ? b : "" } if (-1 < k) {
                        a = b.slice(k).indexOf(")") + k; b = b.substring(k + 8, a).split(","); switch (Number(h[b[0]])) { case 0: b = t(b[4], b[1]); break; case 1: b = t(b[2], b[1]); break; case 2: b = t(b[3], b[1]); break; default: b = b[1] }b ? (h = b, h = h.trim && h.trim() || h.replace(/^\s+|\s+$/g,
                            "")) : h = ""; return h
                    } return -1 < f ? (k = b.substring(0, f), b = Number(b.substring(f + 1, e)), h = h[k], !isNaN(b) && h && (0 > b ? (a = h[h.length + b], "undefined" === typeof a && (a = h[0])) : (a = h[b], "undefined" === typeof a && (a = h[h.length - 1]))), "undefined" !== typeof a ? a : "") : "{" + b + "}"
                } var p = k.format, t = k.pick; b.i18nFormat = function (b, h, k) {
                    var g = function (a, b) { a = a.slice(b || 0); var c = a.indexOf("{"), d = a.indexOf("}"); if (-1 < c && d > c) return { statement: a.substring(c + 1, d), begin: b + c + 1, end: b + d } }, f = [], e = 0; do {
                        var a = g(b, e); var c = b.substring(e, a && a.begin -
                            1); c.length && f.push({ value: c, type: "constant" }); a && f.push({ value: a.statement, type: "statement" }); e = a ? a.end + 1 : e + 1
                    } while (a); f.forEach(function (a) { "statement" === a.type && (a.value = n(a.value, h)) }); return p(f.reduce(function (a, b) { return a + b.value }, ""), h, k)
                }; b.Chart.prototype.langFormat = function (g, h) { g = g.split("."); for (var k = this.options.lang, n = 0; n < g.length; ++n)k = k && k[g[n]]; return "string" === typeof k ? b.i18nFormat(k, h, this) : "" }
            }); w(b, "Accessibility/FocusBorder.js", [b["Core/Globals.js"], b["Core/Renderer/SVG/SVGElement.js"],
            b["Core/Renderer/SVG/SVGLabel.js"], b["Core/Utilities.js"]], function (b, k, n, p) {
                function t(a) { if (!a.focusBorderDestroyHook) { var b = a.destroy; a.destroy = function () { var c, e; null === (e = null === (c = a.focusBorder) || void 0 === c ? void 0 : c.destroy) || void 0 === e ? void 0 : e.call(c); return b.apply(a, arguments) }; a.focusBorderDestroyHook = b } } function g(a) {
                    for (var b = [], d = 1; d < arguments.length; d++)b[d - 1] = arguments[d]; a.focusBorderUpdateHooks || (a.focusBorderUpdateHooks = {}, e.forEach(function (c) {
                        c += "Setter"; var d = a[c] || a._defaultSetter;
                        a.focusBorderUpdateHooks[c] = d; a[c] = function () { var c = d.apply(a, arguments); a.addFocusBorder.apply(a, b); return c }
                    }))
                } function h(a) { a.focusBorderUpdateHooks && (Object.keys(a.focusBorderUpdateHooks).forEach(function (b) { var c = a.focusBorderUpdateHooks[b]; c === a._defaultSetter ? delete a[b] : a[b] = c }), delete a.focusBorderUpdateHooks) } var u = p.addEvent, r = p.extend, f = p.pick, e = "x y transform width height r d stroke-width".split(" "); r(k.prototype, {
                    addFocusBorder: function (a, c) {
                        this.focusBorder && this.removeFocusBorder();
                        var d = this.getBBox(), e = f(a, 3); d.x += this.translateX ? this.translateX : 0; d.y += this.translateY ? this.translateY : 0; var h = d.x - e, k = d.y - e, p = d.width + 2 * e, r = d.height + 2 * e, u = this instanceof n; if ("text" === this.element.nodeName || u) {
                            var w = !!this.rotation; if (u) var x = { x: w ? 1 : 0, y: 0 }; else { var A = x = 0; "middle" === this.attr("text-anchor") ? (x = b.isFirefox && this.rotation ? .25 : .5, A = b.isFirefox && !this.rotation ? .75 : .5) : this.rotation ? x = .25 : A = .75; x = { x: x, y: A } } A = +this.attr("x"); var z = +this.attr("y"); isNaN(A) || (h = A - d.width * x.x - e); isNaN(z) ||
                                (k = z - d.height * x.y - e); u && w && (u = p, p = r, r = u, isNaN(A) || (h = A - d.height * x.x - e), isNaN(z) || (k = z - d.width * x.y - e))
                        } this.focusBorder = this.renderer.rect(h, k, p, r, parseInt((c && c.borderRadius || 0).toString(), 10)).addClass("highcharts-focus-border").attr({ zIndex: 99 }).add(this.parentGroup); this.renderer.styledMode || this.focusBorder.attr({ stroke: c && c.stroke, "stroke-width": c && c.strokeWidth }); g(this, a, c); t(this)
                    }, removeFocusBorder: function () {
                        h(this); this.focusBorderDestroyHook && (this.destroy = this.focusBorderDestroyHook,
                            delete this.focusBorderDestroyHook); this.focusBorder && (this.focusBorder.destroy(), delete this.focusBorder)
                    }
                }); b.Chart.prototype.renderFocusBorder = function () { var a = this.focusElement, b = this.options.accessibility.keyboardNavigation.focusBorder; a && (a.removeFocusBorder(), b.enabled && a.addFocusBorder(b.margin, { stroke: b.style.color, strokeWidth: b.style.lineWidth, borderRadius: b.style.borderRadius })) }; b.Chart.prototype.setFocusToElement = function (a, b) {
                    var c = this.options.accessibility.keyboardNavigation.focusBorder;
                    (b = b || a.element) && b.focus && (b.hcEvents && b.hcEvents.focusin || u(b, "focusin", function () { }), b.focus(), c.hideBrowserFocusOutline && (b.style.outline = "none")); this.focusElement && this.focusElement.removeFocusBorder(); this.focusElement = a; this.renderFocusBorder()
                }
            }); w(b, "Accessibility/Accessibility.js", [b["Accessibility/Utils/ChartUtilities.js"], b["Core/Globals.js"], b["Accessibility/KeyboardNavigationHandler.js"], b["Core/Options.js"], b["Core/Series/Point.js"], b["Core/Series/Series.js"], b["Core/Utilities.js"],
            b["Accessibility/AccessibilityComponent.js"], b["Accessibility/KeyboardNavigation.js"], b["Accessibility/Components/LegendComponent.js"], b["Accessibility/Components/MenuComponent.js"], b["Accessibility/Components/SeriesComponent/SeriesComponent.js"], b["Accessibility/Components/ZoomComponent.js"], b["Accessibility/Components/RangeSelectorComponent.js"], b["Accessibility/Components/InfoRegionsComponent.js"], b["Accessibility/Components/ContainerComponent.js"], b["Accessibility/HighContrastMode.js"], b["Accessibility/HighContrastTheme.js"],
            b["Accessibility/Options/Options.js"], b["Accessibility/Options/LangOptions.js"], b["Accessibility/Options/DeprecatedOptions.js"], b["Accessibility/Utils/HTMLUtilities.js"]], function (b, k, n, p, t, g, h, u, r, f, e, a, c, d, l, w, G, E, M, N, F, H) {
                function x(a) { this.init(a) } var y = k.doc, B = h.addEvent, v = h.extend, D = h.fireEvent, K = h.merge; K(!0, p.defaultOptions, M, { accessibility: { highContrastTheme: E }, lang: N }); k.A11yChartUtilities = b; k.A11yHTMLUtilities = H; k.KeyboardNavigationHandler = n; k.AccessibilityComponent = u; x.prototype = {
                    init: function (a) {
                        this.chart =
                        a; y.addEventListener && a.renderer.isSVG ? (F(a), this.initComponents(), this.keyboardNavigation = new r(a, this.components), this.update()) : a.renderTo.setAttribute("aria-hidden", !0)
                    }, initComponents: function () {
                        var b = this.chart, g = b.options.accessibility; this.components = { container: new w, infoRegions: new l, legend: new f, chartMenu: new e, rangeSelector: new d, series: new a, zoom: new c }; g.customComponents && v(this.components, g.customComponents); var h = this.components; this.getComponentOrder().forEach(function (a) {
                            h[a].initBase(b);
                            h[a].init()
                        })
                    }, getComponentOrder: function () { if (!this.components) return []; if (!this.components.series) return Object.keys(this.components); var a = Object.keys(this.components).filter(function (a) { return "series" !== a }); return ["series"].concat(a) }, update: function () {
                        var a = this.components, b = this.chart, c = b.options.accessibility; D(b, "beforeA11yUpdate"); b.types = this.getChartTypes(); this.getComponentOrder().forEach(function (c) { a[c].onChartUpdate(); D(b, "afterA11yComponentUpdate", { name: c, component: a[c] }) }); this.keyboardNavigation.update(c.keyboardNavigation.order);
                        !b.highContrastModeActive && G.isHighContrastModeActive() && G.setHighContrastTheme(b); D(b, "afterA11yUpdate", { accessibility: this })
                    }, destroy: function () { var a = this.chart || {}, b = this.components; Object.keys(b).forEach(function (a) { b[a].destroy(); b[a].destroyBase() }); this.keyboardNavigation && this.keyboardNavigation.destroy(); a.renderTo && a.renderTo.setAttribute("aria-hidden", !0); a.focusElement && a.focusElement.removeFocusBorder() }, getChartTypes: function () {
                        var a = {}; this.chart.series.forEach(function (b) {
                            a[b.type] =
                            1
                        }); return Object.keys(a)
                    }
                }; k.Chart.prototype.updateA11yEnabled = function () { var a = this.accessibility, b = this.options.accessibility; b && b.enabled ? a ? a.update() : this.accessibility = new x(this) : a ? (a.destroy && a.destroy(), delete this.accessibility) : this.renderTo.setAttribute("aria-hidden", !0) }; B(k.Chart, "render", function (a) { this.a11yDirty && this.renderTo && (delete this.a11yDirty, this.updateA11yEnabled()); var b = this.accessibility; b && b.getComponentOrder().forEach(function (a) { b.components[a].onChartRender() }) });
                B(k.Chart, "update", function (a) { if (a = a.options.accessibility) a.customComponents && (this.options.accessibility.customComponents = a.customComponents, delete a.customComponents), K(!0, this.options.accessibility, a), this.accessibility && this.accessibility.destroy && (this.accessibility.destroy(), delete this.accessibility); this.a11yDirty = !0 }); B(t, "update", function () { this.series.chart.accessibility && (this.series.chart.a11yDirty = !0) });["addSeries", "init"].forEach(function (a) {
                    B(k.Chart, a, function () {
                        this.a11yDirty =
                        !0
                    })
                });["update", "updatedData", "remove"].forEach(function (a) { B(g, a, function () { this.chart.accessibility && (this.chart.a11yDirty = !0) }) });["afterDrilldown", "drillupall"].forEach(function (a) { B(k.Chart, a, function () { this.accessibility && this.accessibility.update() }) }); B(k.Chart, "destroy", function () { this.accessibility && this.accessibility.destroy() })
            }); w(b, "masters/modules/accessibility.src.js", [], function () { })
});
//# sourceMappingURL=accessibility.js.map