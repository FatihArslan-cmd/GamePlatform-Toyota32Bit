package com.gamecenter

import android.content.Context
import android.graphics.LinearGradient
import android.graphics.Shader
import android.util.AttributeSet
import androidx.appcompat.widget.AppCompatTextView
import androidx.core.content.ContextCompat

class TextViewWithGradient : AppCompatTextView {
    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr)

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (changed) {
            // Create the gradient shader
            val startColor = ContextCompat.getColor(context, R.color.purple_primary)
            val endColor = ContextCompat.getColor(context, R.color.orange_accent)
            
            paint.shader = LinearGradient(
                0f, 0f, width.toFloat(), 0f,
                startColor, endColor,
                Shader.TileMode.CLAMP
            )
        }
    }
}